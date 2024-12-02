const { suite, test } = require("../common/test");
const { summary, sum } = require("../common/math");

const main = (data) => {
  const lines = data
    .split("\n")
    .filter(String)
    .map((a) => a.split("   "))
    .map((a) => a.map(Number).filter(Number))
    .reduce(
      (acc, curr) => {
        acc[0].push(curr[0]);
        acc[1].push(curr[1]);
        return acc;
      },
      [[], []]
    );

  let [left, right] = lines;

  left = left.sort((a, b) => a - b);
  right = right.sort((a, b) => a - b);

  let diffCount = 0;
  for (let i = 0; i < left.length; i += 1) {
    diffCount += Math.abs(left[i] - right[i]);
  }

  return diffCount;
};

suite("Day 01 - 1", main, [test("sample.txt", 11), test("real.txt")]);
