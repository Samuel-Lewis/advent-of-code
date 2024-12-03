const { suite, test } = require("../common/test");
const { summary, sum } = require("../common/math");

const main = (data) => {
  const mulString = data.split("\n").filter(String).join("");

  const regex = /mul\((\d+),(\d+)\)/g;
  let count = 0;

  const matches = mulString.matchAll(regex);
  for (const match of matches) {
    const [_, a, b] = match;
    count += a * b;
  }

  return count;
};

suite("Day 03 - 1", main, [test("sample.txt", 161), test("real.txt")]);
