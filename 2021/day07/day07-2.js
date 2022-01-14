const { suite, test } = require("../common/test");

const calcCost = (a, b) => {
  const dist = Math.abs(a - b);
  const coeff = (dist * dist + dist) / 2;
  return coeff;
};

const main = (data) => {
  const crabs = data.split(",").map((x) => parseInt(x));

  const max = crabs.reduce((acc, x) => Math.max(acc, x), 0);
  const costs = new Array(max + 1)
    .fill(0)
    .map((_, i) =>
      crabs.map((c) => calcCost(c, i)).reduce((acc, x) => acc + x, 0)
    );

  const min = costs.reduce((acc, x) => Math.min(acc, x), Infinity);
  return min;
};

suite("Day 07-2", main, [test("sample.txt", 168), test("real.txt")]);
