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

const permute = (data) => {
  const perms = [];
  for (let i = 0; i < data.length; i += 1) {
    const copy = [...data];
    copy.splice(i, 1);
    perms.push(copy);
  }
  return perms;
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

    if (inc || dec) {
      count += 1;
      continue;
    }

    const perms = permute(line);
    for (const perm of perms) {
      const inc = isMoving(perm, 1);
      const dec = isMoving(perm, -1);

      if (inc || dec) {
        count += 1;
        break;
      }
    }
  }

  return count;
};

suite("Day 02 - 2", main, [test("sample.txt", 4), test("real.txt")]);
