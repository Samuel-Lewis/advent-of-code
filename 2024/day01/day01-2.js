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

  let diffCount = 0;
  for (let i = 0; i < left.length; i += 1) {
    const l = left[i];

    for (let j = 0; j < right.length; j += 1) {
      const r = right[j];
      if (r === l) {
        diffCount += l;
      }
    }
  }

  return diffCount;
};

suite("Day 01 - 2", main, [test("sample.txt", 31), test("real.txt")]);
