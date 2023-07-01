// --------ROMAN NUMERAL CONVERTER--------
/**
 * Given an input, either converts a number to a roman numeral or 
 * coverts a roman numeral to an integer.
 *      -Number inputs must be in range of [1, 3999] and an integer
 *       to be considered valid input
 *      -Roman numeral must follow the standard convention of
 *       characters being listed in order of non-increasing values
 *       to be considered valid
 * @param {number | string} input Either a valid arabic number
 * or a valid roman numeral
 * @returns {number | string} If the input was a roman numeral,
 * returns the roman numeral as its equivalent integer. If the 
 * input was a number, returns its equivalent roman numeral.
 */
function romanNumeralConverter(input) {
    const type = typeof input;
    // Used to account for when a valid integer is passed as a string
    const validIntegerRE = /^[0-9]+$/;

    if (type === "number" || validIntegerRE.test(input)) {
        return convertIntToRoman(parseFloat(input));
    } else if (type === "string") {
        return convertRomanToInt(input);
    } else {
        throw new TypeError("Cannot give non-integer number or non-string input to romanNumeralConverter");
    }
}

// Helper Functions
/**
 * Coverts a whole integer to a roman numeral. Throws an error if:
 *      -num is not in the range of [1, 3999]
 *      -num is not an integer
 * @param {number} num An integer represented as an arabic
 * number
 * @returns {string} num represented as a roman numeral
 */
function convertIntToRoman(num) {
    const NUM_LOWER_BOUND = 1;
    const NUM_UPPER_BOUND = 3999;

    if (num % 1 !== 0) {
        throw new TypeError("Cannot convert floats to roman numeral");
    }

    if (num < NUM_LOWER_BOUND || num > NUM_UPPER_BOUND) {
        throw new RangeError(`${num} is out of valid range for roman numerals [${NUM_LOWER_BOUND}, ${NUM_UPPER_BOUND}]`);
    }

    const intToRomanMap = [
        [1000, "M"],
        [900, "CM"],
        [500, "D"],
        [400, "CD"],
        [100, "C"],
        [90, "XC"],
        [50, "L"],
        [40, "XL"],
        [10, "X"],
        [9, "IX"],
        [5, "V"],
        [4, "IV"],
        [1, "I"]
    ];

    let romanNumeral = "";

    while (num > 0) {
        for (let i = 0; i < intToRomanMap.length; i++) {
            if (num >= intToRomanMap[i][0]) {
                num -= intToRomanMap[i][0];
                romanNumeral += intToRomanMap[i][1];
                break;
            }
        }
    }

    return romanNumeral;
}

/**
 * Converts a roman numeral to its equivalent arabic integer
 *      -Roman numeral must be a valid roman numeral with
 *       characters in the order of non-increasing values
 *       (with the exception of cases such as IV, IX, XL...)
 * @param {string} roman A roman numeral
 * @returns The roman numeral's equivalent arabic integer
 */
function convertRomanToInt(roman) {
    const romanNumeralRE = /^M{0,3}(CM|CD|D?C{0,3})(XC|XL|L?X{0,3})(IX|IV|V?I{0,3})$/;

    if (!romanNumeralRE.test(roman)) {
        throw new TypeError("Cannot convert strings that are not valid roman numerals");
    }

    const romanToIntMap = {
        "I": 1,
        "V": 5,
        "X": 10,
        "L": 50,
        "C": 100,
        "D": 500,
        "M": 1000,
    }

    const specialRomanToIntMap = {
        "IV": 4,
        "IX": 9,
        "XL": 40,
        "XC": 90,
        "CD": 400,
        "CM": 900
    }

    let num = 0;
    // Used to track if a special case is found such as "IV"
    // Blank to start
    let lastChar = "";

    for (let i = 0; i < roman.length; i++) {
        let lastTwoChars = lastChar + roman[i];

        if (lastTwoChars in specialRomanToIntMap) {
            // When a special case is found, must
            // subtract the incorrectly added value
            // before adding the correct one
            // i.e. when "IX" is detected, that means
            //      "I" was detected before and a 1
            //      was incorrectly added, so it must
            //      must be subtracted before adding
            //      the correct value
            num -= romanToIntMap[lastChar]
            num += specialRomanToIntMap[lastTwoChars];
        } else {
            num += romanToIntMap[roman[i]];
        }

        lastChar = roman[i];
    }

    return num;
}


export default romanNumeralConverter;

