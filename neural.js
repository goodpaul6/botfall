function createNeural(inputNodeCount, hiddenNodeCount, outputNodeCount) {
    return {
        // Node counts for convenience
        inputNodeCount,
        hiddenNodeCount,
        outputNodeCount,

        weights: [
            createRandomFilledMatrix({
                rows: hiddenNodeCount,
                cols: inputNodeCount,
            }),
            createRandomFilledMatrix({
                rows: outputNodeCount,
                cols: hiddenNodeCount,
            }),
        ],

        biases: [
            createRandomFilledMatrix({
                rows: hiddenNodeCount,
                cols: 1,
            }),
            createRandomFilledMatrix({
                rows: outputNodeCount,
                cols: 1,
            }),
        ],
    };
}

function neuralFeedForward(net, inputMatrix) {
    let outputMatrix = inputMatrix;

    for (let i = 0; i < net.weights.length; ++i) {
        outputMatrix = matrixDot(net.weights[i], outputMatrix);
        outputMatrix = matrixAdd(outputMatrix, net.biases[i]);
    }

    return outputMatrix;
}

function testNeuralModule() {
    const net = createNeural(2, 2, 2);

    const res = neuralFeedForward(
        net,
        createMatrixFromColumnArrays([[
            1,
            2,
        ]]),
    );

    matrixPrint(res);
}
