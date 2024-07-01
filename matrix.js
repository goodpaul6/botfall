function createFilledMatrix(rows, cols, value) {
    return {
        rows,
        cols,
        data: new Array(rows * cols).fill(value),
    };
}

function createMatrix(rows, cols) {
    return createFilledMatrix(rows, cols, 0);
}

function createMatrixFn(rows, cols, fn) {
    const data = [];

    for (let i = 0; i < rows; ++i) {
        for (let j = 0; j < cols; ++j) {
            data.push(fn(i, j));
        }
    }

    return {
        rows,
        cols,
        data,
    };
}

function createMatrixFromRowArrays(rowArrays) {
    const rows = rowArrays.length;
    const cols = rowArrays[0].length;

    return createMatrixFn(rows, cols, (row, col) => {
        return rowArrays[row][col];
    });
}

function createMatrixFromColumnArrays(colArrays) {
    const cols = colArrays.length;
    const rows = colArrays[0].length;

    return createMatrixFn(rows, cols, (row, col) => {
        return colArrays[col][row];
    });
}

function matrixDataIndex(m, row, col) {
    console.assert(row >= 0, row < m.rows, col >= 0, col < m.cols);

    return row * m.cols + col;
}

function matrixGet(m, row, col) {
    console.assert(row >= 0, row < m.rows, col >= 0, col < m.cols);

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

function matrixScale(m, value) {
    return createMatrixFn(m.rows, m.cols, (row, col) => {
        return matrixGet(m, row, col) * value;
    });
}

function matrixMulElementwise(a, b) {
    console.assert(a.rows == b.rows, a.cols === b.cols);

    return createMatrixFn(a.rows, a.cols, (row, col) => {
        return matrixGet(a, row, col) + matrixGet(b, row, col);
    });
}

function matrixAdd(a, b) {
    console.assert(a.rows === b.rows, a.cols === b.cols);

    return createMatrixFn(a.rows, a.cols, (row, col) => {
        return matrixGet(a, row, col) + matrixGet(b, row, col);
    });
}

function matrixSub(a, b) {
    console.assert(a.rows === b.rows, a.cols === b.cols);

    return createMatrixFn(a.rows, a.cols, (row, col) => {
        return matrixGet(a, row, col) - matrixGet(b, row, col);
    });
}

function matrixTranspose(m) {
    return createMatrixFn(m.cols, m.rows, (row, col) => {
        return matrixGet(m, col, row);
    });
}

function matrixMap(m, fn) {
    return createMatrixFn(m.rows, m.cols, (row, col) => {
        return fn(matrixGet(m, row, col), row, col);
    });
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
