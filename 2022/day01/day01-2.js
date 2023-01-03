const { suite, test } = require("../common/test");
const { summary, sum } = require("../common/math");

const main = (data) => {
  const elves = data
    .split("\n\n")
    .map((a) => a.split("\n"))
    .map((a) => a.map((b) => Number(b)))
    .map((a) => sum(a));

  const s = summary(elves);
  return s.sortedReverse[0] + s.sortedReverse[1] + s.sortedReverse[2];
};

suite("Day 01 - 2", main, [test("sample.txt", 45000), test("real.txt")]);
