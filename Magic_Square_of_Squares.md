Magic Square of Squares

Disclaimer: It is thought that finding a magic square of squares with all unique
numbers is impossible (not to discourage you however, there is a bounty worth a few
thousand dollars if you want to try and find it).

Coding challenge: Try and generate a magic square of squares that satisfy as many
of the criteria using as many unique numbers as possible

Conditions of satisfaction:
 - Each item in each column equal the same value
 - Each item in each row equal the same value
 - Each item in each diagonal equal the same value
 - Each number should be unique

Do your best to follow the conditions of satisfaction; a little rule-breaking is encouraged
as the goal of this coding challenge is to explore some math algorithms :)

const matrix = [
  [x1, x2, x3],
  [x4, x5, x6],
  [x7, x8, x9]
];

x1 + x2 + x3 === x4 + x5 + x6;
/*        */ === x7 + x8 + x9;
/*        */ === x1 + x5 + x9;
/*        */ === x3 + x5 + x7;
/*        */ === x1 + x4 + x7;
/*        */ === x2 + x5 + x8;
