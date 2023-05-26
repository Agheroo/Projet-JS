const fs = require("fs");
const tf = require("@tensorflow/tfjs");

/** Extract training data from the csv file */
function extractTrainingData(path) {
    csvFile = fs.readFileSync("bodyPerformance.csv").toString();
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
    const data = extractTrainingData("bodyPerformance.csv");
    // console.log(data);

    const inputs = data.map(obj => obj.x);
    const labels = data.map(obj => obj.y);
    const inputTensor = tf.tensor2d(inputs, [inputs.length, inputs[0].length]);
    const labelTensor = tf.tensor2d(labels, [labels.length, labels[0].length]);
    const inputMin = inputTensor.min();
    const inputMax = inputTensor.max();
    const labelMin = labelTensor.min();
    const labelMax = labelTensor.max();
    const nmInputs = inputTensor.sub(inputMin).div(inputMax.sub(inputMin));
    const nmLabels = labelTensor.sub(labelMin).div(labelMax.sub(labelMin));

    const model = tf.sequential();
    model.add(tf.layers.dense({ inputShape: [inputs[0].length], units: 128, activation: "relu", useBias: true }));
    model.add(tf.layers.dense({ units: labels[0].length, activation: "softmax", useBias: true }));
    model.compile({ loss: "meanSquaredError", optimizer: "sgd" });
}

runTF();