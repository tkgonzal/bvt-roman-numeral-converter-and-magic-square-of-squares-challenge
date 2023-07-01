import romanNumeralConverter from "./romanNumeralConverter.js";
import generateMagicSquareOfSquares,
{
    getMagicNumber,
    logSquareOfSquares
} from "./magicSquareOfSquares.js";

// Constants
const romanNumeralTestArgs = [
    // Original Given Test Cases
    6,          // Valid number
    "6",        // Valid number as string
    20,         // Valid number
    "L",        // Valid roman numeral

    // New test cases
    true,           // Invalid input type
    "6.5",          // Invalid string input
    "3859",         // Valid number as string
    -1,             // Out of number range
    2.5,            // Float, invalid number type
    4000,           // Out of number range
    "IL",           // Invalid roman rumeral
    3999,           // Upper bound of numbers
    1,              // Lower bound of numbers
    "MMMCMXCIX",    // Valid roman numeral, should convert to 3999
    "I",            // Lower bound of valid roman numerals
    "MMMM"          // Invalid roman numeral 
];

// --------MAIN FUNCTION--------
(() => {
    // --------TESTING ROMAN NUMERAL CONVERSION--------
    console.log("--------TESTING romanNumeralConverter--------");
    for (let arg of romanNumeralTestArgs) {
        try {
            console.log("---------");
            console.log(`Result of passing ${arg}: `);
            console.log(romanNumeralConverter(arg));
        } catch (error) {
            console.log(error.message);
        }
    }

    // ---------TESTING MAGIC SQUARE OF SQUARES--------
    console.log("\n--------TESTING generateMagicSquareOfSquares--------");
    // Current implementation of generateMagicSquareOfSquares uses
    // brute force approach with minor search pruning based on some logic
    // deduced from the general structure of a Parker Square. Is inefficient
    // and takes some time to calculate (about a minute) and only returns
    // a magic square that has as many repeated values as a Parker Square
    // and potentially a diagonal that does not sum to the magic number
    try {
        const foundMagicSquareOfSquares = generateMagicSquareOfSquares();
        logSquareOfSquares(foundMagicSquareOfSquares);
        console.log(`Has magic number of ${getMagicNumber(
            foundMagicSquareOfSquares
        )}`);
    } catch (error) {
        console.log(error.message);
    }
})();

