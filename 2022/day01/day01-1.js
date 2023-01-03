const { suite, test } = require("../common/test");
const { summary, sum } = require("../common/math");

const main = (data) => {
  const elves = data
    .split("\n\n")
    .map((a) => a.split("\n"))
    .map((a) => a.map((b) => Number(b)))
    .map((a) => sum(a));

  const s = summary(elves);
  return s.max.value;
};

suite("Day 01 - 1", main, [test("sample.txt", 24000), test("real.txt")]);
