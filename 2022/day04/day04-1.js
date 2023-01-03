const { suite, test } = require("../common/test");
const { sum } = require("../common/math");

const doesOverlap = (a, b) => {
  return (
    (a.start <= b.start && a.end >= b.end) ||
    (b.start <= a.start && b.end >= a.end)
  );
};

const main = (data) => {
  const moves = data
    .split("\n")
    .filter(String)
    .map((a) => a.split(","))
    .map(([a, b]) => {
      const [a1, a2] = a.split("-").map(Number);
      const [b1, b2] = b.split("-").map(Number);
      return [
        { start: a1, end: a2 },
        { start: b1, end: b2 },
      ];
    })
    .filter(([a, b]) => doesOverlap(a, b));

  return moves.length;
};

suite("Day 04 - 1", main, [test("sample.txt", 2), test("real.txt")]);
