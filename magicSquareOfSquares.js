// --------MAGIC SQUARE OF SQUARES--------
// Constants
// Used to limit the range of values to brute force search through
const VAL_MAX = 100;
// Parker square, used for initial testing
const PARKER_SQUARE = [
    [29, 1, 47],
    [41, 37, 1],
    [23, 41, 29]
];

/**
 * Uses brute force search to generate a semi-magic square
 * of squares. Given the structure of a Parker Square, we can 
 * create of system of equations for a semi-magic square of squares
 * using the magic property of its rows, columns, and one of its
 * diagonals by saying: 
 * 
 * [a², b², c²          [a², b², c²
 *  d², e², f²    ===    d², e², b²
 *  g², h², i²]          g², d², a²]
 * 
 * based on the structure of the repeating values in the Parker Square.
 * From here, we can use the system of equations to define a constraint
 * to build a semi magic square of squares of the same structure:
 * 
 *          2a² - b² - d² = 0 
 * 
 * (Can open parker_square_notes.pdf in a PDF Reader to see process of
 * determining this)     
 * We can use this to limit the amount of possible 3x3 matrices we have
 * to search through to find semi magic square of squares that are at
 * least as magic as a Parker Square.
 * @returns A semi-magic square of squares in the structure of a 
 * Parker Square
 */
function generateMagicSquareOfSquares() {
    const foundSemiMagicSquareOfSquares = [];

    for (let a = 1; a < VAL_MAX; a++) {
        for (let b = 1; b < VAL_MAX; b++) {
            for (let d = 1; d < VAL_MAX; d++) {
                if (satisfiesParkerConstraints(a, b, d)) {
                    bruteForceSearchSquares([a, b, d],
                        foundSemiMagicSquareOfSquares);
                }
            }
        }
    }

    if (foundSemiMagicSquareOfSquares.length == 0) {
        throw new Error(`No semi-magic squares found in the range of values [1, ${VAL_MAX}]`);
    }

    // Returns last found one because the first few are all rotations
    // of the Parker Square
    return foundSemiMagicSquareOfSquares.at(-1);
}

// Helper Functions
/**
 * @param {Number} a A repeated value in a parker square
 * @param {Number} b A repeated value in a parker square
 * @param {Number} d A repeated value in a parker square
 * @returns {bool} Whether or not a, b, and d, are unique
 * and satisfy the Parker Square constraint of:
 *      2a² - b² - d² = 0 
 */
function satisfiesParkerConstraints(a, b, d) {
    return a !== b &&
        b !== d &&
        d !== a &&
        2 * a ** 2 - b ** 2 - d ** 2 === 0;
}

/**
 * Using the values of a, b, d, does a brute force search to fill in the
 * remaining values of a matrix. If a semi magic square is found, adds it
 * to the list of found semi magic square of squares.
 * @param {Number[]} repeatVals An array of [a, b, d] The repeated values to be
 * considered of a semi-magic square
 * @param {Number[][][]} foundSemiMagicSquareOfSquares The array of all found
 * semi-magic squares
 */
function bruteForceSearchSquares([a, b, d], foundSemiMagicSquareOfSquares) {
    for (let c = 1; c < VAL_MAX; c++) {
        for (let e = 1; e < VAL_MAX; e++) {
            for (let g = 1; g < VAL_MAX; g++) {
                let square = [
                    [a, b, c],
                    [d, e, b],
                    [g, d, a]
                ];

                if (isSemiMagicSquareOfSquares(square)) {
                    foundSemiMagicSquareOfSquares.push(square);
                }
            }
        }
    }
}

/**
 * Returns whether or not a given square is a semi magic square 
 * of square. This is defined by:
 *      -If all rows and columns sum to the same number 
 *       when each entry is squared (is magic)
 *      -If at least one diagonal sums to the same number as
 *       as the columns and rows when each entry is squared
 *      -Has a minimal amount of repeating values (Arbitrarily
 *       defined by the amount of repeating values in the 
 *       Parker Square)
 * @param {Number[][]} square A 3x3 matrix of integers
 * @returns {bool} Whether or not the square is a semi-magic 
 * square of squares
 */
function isSemiMagicSquareOfSquares(square) {
    const magicNumber = getMagicNumber(square);

    return hasMinimalRepeatingValues(square, magicNumber) &&
        isMagicForADiagonal(square, magicNumber) &&
        isMagicForRowsAndColumns(square, magicNumber);
}

/**
 * Gets the magic number for a potential magic square of squares
 * @param {Number[][]} square A 3x3 matrix
 * @returns The magic number to be considered for the matrix,
 * calculated as the its first row's entries squared then summed
 * together
 */
function getMagicNumber(square) {
    return sumArraySquared(square[0]);
}

/**
 * Determines if the rows and columns of a square are
 * magic, in that the sum of each entry when squared sum up
 * to the same magic number
 * @param {Number[][]} square A 3x3 matrix of integers
 * @param {Number} magicNumber The number all the rows and
 * columns will be tested against
 * @returns {bool} Whether the rows and columns of the square
 * are "magic"
 */
function isMagicForRowsAndColumns(square, magicNumber) {
    const cols = [];
    for (let i = 0; i < square.length; i++) {
        cols.push(square.map(row => row[i]));
    }

    const rowsAndCols = square.concat(cols);
    const isMagic = (arr) => sumArraySquared(arr) === magicNumber;

    return rowsAndCols.every(isMagic);
}

/**
 * Determines if the square has at least one diagonal that is
 * considered "magic" (When each entry is squared and summed,
 * sums to the magic number)
 * @param {Number[][]} square A 3x3 matrix of integers
 * @param {Number} magicNumber The number the diagonals
 * will be tested against
 * @returns {bool} Whether at least one of the diagonals
 * of the square is magic
 */
function isMagicForADiagonal(square, magicNumber) {
    const posDiagonal = [square[2][0], square[1][1], square[0][2]];
    const negDiagonal = [square[0][0], square[1][1], square[2][2]];

    return sumArraySquared(posDiagonal) === magicNumber ||
        sumArraySquared(negDiagonal) === magicNumber;
}

/**
 * Returns whether or not a square has minimal repeating values.
 * This threshold is based on whether or not it has at most
 * the same amount of repeating values as the Parker Square
 * @param {Number[][]} square A 3x3 matrix of integers
 * @returns {bool} Whether the square as minimal repeating values
 */
function hasMinimalRepeatingValues(square) {
    const MIN_UNIQUE_VALUES = 6;
    const MIN_VALUE_REPEAT = 2;

    const countMap = new Map();

    for (let row of square) {
        for (let num of row) {
            if (countMap.has(num)) {
                countMap.set(num, countMap.get(num) + 1);
            } else {
                countMap.set(num, 1);
            }
        }
    }

    // The array of the frequency of each value that appears 
    // in the square
    const squareValCounts = Array.from(countMap.values());
    const lessThanThreshhold = cur => cur <= MIN_VALUE_REPEAT;

    return squareValCounts.length >= MIN_UNIQUE_VALUES &&
        squareValCounts.every(lessThanThreshhold);
}

/**
 * @param {Number[]} arr An array with 3 integers
 * @returns The sum of each entry in the array squared
 */
function sumArraySquared(arr) {
    return arr.reduce((acc, curr) => acc + (curr ** 2), 0);
}

/**
 * Logs to the console a square in form of a square of
 * squares with more legible matrix formatting
 * @param {Number[][]} square A 3x3 matrix of integers
 */
function logSquareOfSquares(square) {
    for (let i = 0; i < square.length; i++) {
        const row = square[i]
            .map(num => `${num}²`)
            .join(", ");

        console.log(
            `${i === 0 ? "[" : ""}` +
            row +
            `${i === square.length - 1 ? "]" : ""}`
        );
    }
}

export default generateMagicSquareOfSquares
export {
    PARKER_SQUARE,
    logSquareOfSquares,
    isSemiMagicSquareOfSquares,
    getMagicNumber
};

