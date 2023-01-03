const { suite, test } = require("../common/test");

const WINDOW_SIZE = 4;

const main = (data) => {
  const signal = data.split("\n")[0].split("");

  for (let i = 0; i < signal.length - WINDOW_SIZE + 1; i++) {
    const end = i + WINDOW_SIZE;
    const window = signal.slice(i, end);
    const set = new Set(window);
    if (set.size === WINDOW_SIZE) {
      return end;
    }
  }

  return -1;
};

suite("Day 06 - 1", main, [
  test("sample.txt", 7),
  test("example1.txt", 5),
  test("example2.txt", 6),
  test("example3.txt", 10),
  test("example4.txt", 11),
  test("real.txt"),
]);
