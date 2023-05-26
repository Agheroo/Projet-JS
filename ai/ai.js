const tf = require("@tensorflow/tfjs");
const fs = require("fs");

parameters = JSON.parse(fs.readFileSync("./ai/model.json"));

const model = tf.sequential();
model.add(tf.layers.dense({ inputShape: [parameters.w0.length], units: parameters.w0[0].length, activation: "relu" }));
model.add(tf.layers.dense({ units: parameters.w1[0].length, activation: "softmax" }));
model.layers[0].setWeights([tf.tensor2d(parameters.w0), tf.tensor1d(parameters.b0)]);
model.layers[1].setWeights([tf.tensor2d(parameters.w1), tf.tensor1d(parameters.b1)]);
model.compile({ loss: "meanSquaredError", optimizer: "sgd", metrics: ['accuracy'] });

const inputMin = tf.tensor1d(parameters.inputMin);
const inputMax = tf.tensor1d(parameters.inputMax);

function testNote(userInfo) {
    const nmInputs = tf.tensor2d([userInfo]).sub(inputMin).div(inputMax.sub(inputMin));
    const output = model.predict(nmInputs).round().arraySync()[0];
    switch (output.toString()) {
        case "1,0,0,0":
            return "a";
        case "0,1,0,0":
            return "b";
        case "0,0,1,0":
            return "c";
        case "0,0,0,1":
            return "d";
        default:
            return "c";
    }
}

module.exports.testNote = testNote;