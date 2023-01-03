const { suite, test } = require("../common/test");
const { sum } = require("../common/math");

const scoreLetter = ([letter]) => {
  const code = letter.charCodeAt(0);
  if (code >= 65 && code <= 90) {
    // A-Z = 27 - 52
    return code - 38;
  }
  if (code >= 97 && code <= 122) {
    // a-z = 1 - 26
    return code - 96;
  }
};

const split = (line) => {
  // return half of string
  const half = Math.floor(line.length / 2);
  return [line.slice(0, half), line.slice(half)];
};

const intersect = ([a, b]) => {
  const letters = a.filter((letter) => b.includes(letter));
  return [...new Set(letters)];
};

const main = (data) => {
  const moves = data
    .split("\n")
    .filter(String)
    .map((a) => a.split(""))
    .map(split)
    .map(intersect)
    .map(scoreLetter);
  return sum(moves);
};

suite("Day 03 - 1", main, [test("sample.txt", 157), test("real.txt")]);
