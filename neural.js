function createNeural(inputNodeCount, hiddenNodeCount, outputNodeCount) {
    return {
        // Node counts for convenience
        inputNodeCount,
        hiddenNodeCount,
        outputNodeCount,

        learningRate: 0.8,

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

function sigmoid(x) {
    return 1 / (1 + Math.exp(-x));
}

function dSigmoidGivenSigmoid(sigX) {
    return sigX * (1 - sigX);
}

function neuralFeedForwardRetainOutputs(net, inputMatrix) {
    let outputMatrix = inputMatrix;

    const outputs = [];

    for (let i = 0; i < net.weights.length; ++i) {
        outputMatrix = matrixDot(net.weights[i], outputMatrix);
        outputMatrix = matrixAdd(outputMatrix, net.biases[i]);
        outputMatrix = matrixMap(outputMatrix, (x) => sigmoid(x));

        outputs.push(outputMatrix);
    }

    return outputs;
}

function neuralFeedForward(net, inputMatrix) {
    const outputs = neuralFeedForwardRetainOutputs(
        net,
        inputMatrix,
    );

    return outputs[net.weights.length - 1];
}

function neuralTrain(net, inputMatrix, targetMatrix) {
    const outputMatrices = neuralFeedForwardRetainOutputs(net, inputMatrix);

    // The first layer we see is the output layer
    let layerErrors =
        matrixSub(targetMatrix, outputMatrices[net.weights.length - 1]);

    for (let i = net.weights.length - 1; i >= 0; --i) {
        const layerOutputMatrix = outputMatrices[i];
        const prevLayerOutputMatrix =
            i > 0 ? outputMatrices[i - 1] : inputMatrix;

        const gradient = matrixMap(
            layerOutputMatrix,
            (value) => dSigmoidGivenSigmoid(value),
        );

        const gradientScaledByError =
            matrixMulElementwise(gradient, layerErrors);

        const prevLayerOutputT = matrixTranspose(prevLayerOutputMatrix);

        // Should produce a matrix which matches the weight matrix in rows/cols
        const deltaWeights = matrixDot(gradientScaledByError, prevLayerOutputT);

        const deltaWeightsLearningRate =
            matrixScale(deltaWeights, net.learningRate);

        const newWeights = matrixAdd(net.weights[i], deltaWeightsLearningRate);

        // For adjusting biases
        const gradientScaledByErrorLearningRate =
            matrixScale(gradientScaledByError, net.learningRate);

        const newBiases =
            matrixAdd(net.biases[i], gradientScaledByErrorLearningRate);

        // Next layer errors are just the tranpose of the weights multiplied by
        // the error (for these matrices the transpose works fine to reverse the
        // feedforward).
        if (i > 0) {
            const weightsT = matrixTranspose(net.weights[i]);
            layerErrors = matrixDot(weightsT, layerErrors);

            layerErrors = matrixMulElementwise(
                layerErrors,
                matrixMap(
                    prevLayerOutputMatrix,
                    (value) => dSigmoidGivenSigmoid(value),
                    ));
        }

        // Update this _after_ we got the tranpose of the original weights
        // matrix/ for calculating the next error.
        net.weights[i] = newWeights;
        net.biases[i] = newBiases;
    }
}

function testNeuralModule() {
    const net = createNeural(2, 2, 2);

    const input = createMatrixFromColumnArrays([[
        1,
        2,
    ]]);

    const res = neuralFeedForward(net, input);

    matrixPrint(res);

    neuralTrain(
        net,
        input,
        createMatrixFromColumnArrays([[
            0.5,
            0.2,
        ]]),
    );

    matrixPrint(net.weights[0]);
    matrixPrint(net.weights[1]);
}
