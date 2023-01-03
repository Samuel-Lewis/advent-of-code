const { suite, test } = require("../common/test");

const dirDelta = {
  U: { x: 0, y: -1 },
  D: { x: 0, y: 1 },
  L: { x: -1, y: 0 },
  R: { x: 1, y: 0 },
};

const stepTowards = (start, dest) => {
  if (start.x === dest.x && start.y === dest.y) {
    return start;
  }
  let inter = { ...start };

  const xDiff = dest.x - start.x;
  const yDiff = dest.y - start.y;
  const xDelta = Math.abs(xDiff);
  const yDelta = Math.abs(yDiff);
  const xSign = xDiff / xDelta;
  const ySign = yDiff / yDelta;

  if (xDelta > 1) {
    inter.x += xSign;
    if (yDelta > 0) {
      inter.y += ySign;
    }
  }

  if (yDelta > 1) {
    inter.y += ySign;
    if (xDelta > 0) {
      inter.x += xSign;
    }
  }

  return inter;
};

const main = (data) => {
  const insts = data
    .split("\n")
    .filter(String)
    .flatMap((line) => {
      const [dir, d] = line.split(" ");
      return new Array(Number(d)).fill(dirDelta[dir]);
    });

  let head = { x: 0, y: 0 };
  let tail = { x: 0, y: 0 };
  const tailSeen = new Set();
  tailSeen.add(`${0},${0}`);

  for (const inst of insts) {
    head.x += inst.x;
    head.y += inst.y;

    tail = stepTowards(tail, head);

    tailSeen.add(`${tail.x},${tail.y}`);
  }

  return tailSeen.size;
};

suite("Day 09 - 1", main, [test("sample.txt", 13), test("real.txt")]);
