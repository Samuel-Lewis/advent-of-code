const { suite, test } = require("../common/test");
const { summary, sum } = require("../common/math");

const minStep = 1;
const maxStep = 3;

const isMoving = (data, direction = 1) => {
  for (let i = 0; i < data.length - 1; i += 1) {
    const step = data[i + 1] - data[i];
    const normalised = step * direction;

    if (normalised < minStep || normalised > maxStep) {
      return false;
    }
  }

  return true;
};

const main = (data) => {
  const lines = data
    .split("\n")
    .filter(String)
    .map((a) => a.split(" "))
    .map((a) => a.map(Number).filter(Number));

  let count = 0;
  for (const line of lines) {
    const inc = isMoving(line, 1);
    const dec = isMoving(line, -1);

    console.log({ line, inc, dec });

    if (inc || dec) {
      count += 1;
    }
  }

  return count;
};

suite("Day 02 - 1", main, [test("sample.txt", 2), test("real.txt")]);
