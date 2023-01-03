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

const intersect = ([a, b]) => {
  const letters = a.filter((letter) => b.includes(letter));
  return [...new Set(letters)];
};

const main = (data) => {
  const moves = data
    .split("\n")
    .filter(String)
    .map((a) => a.split(""))
    .reduce((groups, move, index) => {
      if (index % 3 === 0) {
        groups.push([]);
      }
      groups[groups.length - 1].push(move);
      return groups;
    }, [])
    .map(([a, b, c]) => intersect([intersect([a, b]), c]))
    .map(scoreLetter);

  return sum(moves);
};

suite("Day 03 - 2", main, [test("sample.txt", 70), test("real.txt")]);
