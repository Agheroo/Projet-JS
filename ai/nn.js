const fs = require("fs");
const path = require("path");
const tf = require("@tensorflow/tfjs");

/** Extract training data from the csv file */
function extractTrainingData(path) {
    csvFile = fs.readFileSync(path).toString();
    data = [];
    rows = csvFile.split("\n");

    for (let i = 1; i < rows.length - 1; i++) {
        let tmp = { x: [], y: [] };
        cols = rows[i].split(",");
        for (let j = 0; j < cols.length; j++) {
            if (j === 1) {
                if (cols[j] === "M") tmp.x.push(1, 0);
                if (cols[j] === "F") tmp.x.push(0, 1);
            } else if (j === 11) {
                if (cols[j] === "A") tmp.y.push(1, 0, 0, 0);
                if (cols[j] === "B") tmp.y.push(0, 1, 0, 0);
                if (cols[j] === "C") tmp.y.push(0, 0, 1, 0);
                if (cols[j] === "D") tmp.y.push(0, 0, 0, 1);
            } else tmp.x.push(parseFloat(cols[j]));
        }
        data.push(tmp);
    }

    return data;
}

/** Main function */
async function runTF() {
    const data = extractTrainingData("./bodyPerformance.csv");

    // Convert Input to Tensors
    const inputs = data.map(obj => obj.x);
    const labels = data.map(obj => obj.y);
    const inputTensor = tf.tensor2d(inputs, [inputs.length, inputs[0].length]);
    const labelTensor = tf.tensor2d(labels, [labels.length, labels[0].length]);
    const inputMin = inputTensor.min(0);
    const inputMax = inputTensor.max(0);
    const labelMin = labelTensor.min(0);
    const labelMax = labelTensor.max(0);
    const nmInputs = inputTensor.sub(inputMin).div(inputMax.sub(inputMin));
    const nmLabels = labelTensor.sub(labelMin).div(labelMax.sub(labelMin));

    // Create a Tensorflow Model
    const model = tf.sequential();
    model.add(tf.layers.dense({ inputShape: [inputs[0].length], units: 128, activation: "relu" }));
    model.add(tf.layers.dense({ units: labels[0].length, activation: "softmax" }));
    model.compile({ loss: "meanSquaredError", optimizer: "sgd", metrics: ['accuracy'] });

    // Start Training
    await trainModel(model, nmInputs, nmLabels);

    // Save Model
    const save = {};
    save.w0 = model.layers[0].getWeights()[0].arraySync();
    save.w1 = model.layers[1].getWeights()[0].arraySync();
    save.b0 = model.layers[0].getWeights()[1].arraySync();
    save.b1 = model.layers[1].getWeights()[1].arraySync();
    save.inputMin = inputMin.arraySync();
    save.inputMax = inputMax.arraySync();
    fs.writeFileSync("./model.json", JSON.stringify(save));
}

function onEpochEnd(epoch, logs) {
    console.log('Accuracy', logs.acc);
}

/** Train the Model */
async function trainModel(model, inputs, labels) {
    const epochs = 250;
    const callbacks = { onEpochEnd };
    return await model.fit(inputs, labels,
        { epochs, shuffle: true, callbacks }).then(info => { console.log('Final accuracy', info.history.acc); });
}

runTF();