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

    matrixPrint(a);
    matrixPrint(b);

    const c = matrixDot(a, b);

    matrixPrint(c);
}
