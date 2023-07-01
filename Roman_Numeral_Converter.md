Roman Numeral Converter

Coding challenge: Create a function that takes either a number or a Roman numeral and converts it
to either a number or a Roman numeral

Arabic    Roman Numeral
1         I
3         III
4         IV
5         V
6         VI
10        X
11        XI
20        XX
50        L
59        LIX
60        LX
68        LXVIII
69        LXIX
90        XC
100       C

const romanNumerals = {
  'I': 1,
  'V': 5,
  'X': 10,
  // ...
};

Below is some expected output based on an input value:
covertValue(6);   // "VI"
covertValue("6"); // "VI"
covertValue(20);  // "XX"
covertValue("L"); // 50
