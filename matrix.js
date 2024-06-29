function createMatrix(rows, cols) {
    return {
        rows,
        cols,
        data: new Array(rows * cols).fill(0),
    };
}

function createMatrixFromRowArrays(rowArrays) {
    const rows = rowArrays.length;
    const cols = rowArrays[0].length;
    const data = [];

    for (let i = 0; i < rowArrays.length; ++i) {
        for (let j = 0; j < rowArrays[i].length; ++j) {
            data.push(rowArrays[i][j]);
        }
    }

    return {
        rows,
        cols,
        data,
    };
}

function createMatrixFromColumnArrays(colArrays) {
    const cols = colArrays.length;
    const rows = colArrays[0].length;
    const data = [];

    for (let i = 0; i < rows; ++i) {
        for (let j = 0; j < cols; ++j) {
            data.push(colArrays[j][i]);
        }
    }

    return {
        rows,
        cols,
        data,
    };
}

function matrixDataIndex(m, row, col) {
    console.assert(row >= 0, row < m.rows, col >= 0, col < m.cols);

    return row * m.cols + col;
}

function matrixGet(m, row, col) {
    return m.data[matrixDataIndex(m, row, col)];
}

function matrixPrint(m) {
    const arrays = [];

    for (let i = 0; i < m.rows; ++i) {
        arrays.push([]);

        for (let j = 0; j < m.cols; ++j) {
            arrays[i].push(matrixGet(m, i, j));
        }
    }

    console.table(arrays);
}

function matrixSetInPlace(m, row, col, value) {
    m.data[matrixDataIndex(m, row, col)] = value;
}

function matrixFillRandomInPlace(m, minValue = -1, maxValue = 1) {
    for (let i = 0; i < m.data.length; ++i) {
        m.data[i] = Math.random() * (maxValue - minValue) + minValue;
    }
}

function createRandomFilledMatrix({
    rows,
    cols,
    minValue = -1,
    maxValue = 1,
}) {
    const m = createMatrix(rows, cols);
    matrixFillRandomInPlace(m, minValue, maxValue);

    return m;
}

function matrixDot(a, b) {
    console.assert(a.cols === b.rows);

    const c = createMatrix(a.rows, b.cols);

    for (let i = 0; i < a.rows; ++i) {
        for (let j = 0; j < b.cols; ++j) {
            let sum = 0;

            for (let k = 0; k < a.cols; ++k) {
                sum += matrixGet(a, i, k) * matrixGet(b, k, j);
            }

            matrixSetInPlace(c, i, j, sum);
        }
    }

    return c;
}

function matrixAdd(a, b) {
    console.assert(a.rows === b.rows, a.cols === b.cols);

    const c = createMatrix(a.rows, a.cols);

    for (let i = 0; i < a.rows; ++i) {
        for (let j = 0; j < b.rows; ++j) {
            matrixSetInPlace(c, i, j, matrixGet(a, i, j) + matrixGet(b, i, j));
        }
    }

    return c;
}

function testMatrixModule() {
    const a = createMatrixFromRowArrays([
        [1, 2, 3],
        [4, 5, 6],
    ]);

    const b = createMatrixFromRowArrays([
        [7, 8],
        [9, 10],
        [11, 12],
    ]);

    const c = matrixDot(a, b);

    console.assert(
        c.data[0] === 58,
        c.data[1] === 64,
        c.data[2] === 139,
        c.data[3] === 154,
    );
}
