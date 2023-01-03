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

  let xMoved = false;
  let yMoved = false;

  if (xDelta > 1) {
    inter.x += xSign;
    xMoved = true;
    if (yDelta > 0) {
      inter.y += ySign;
      yMoved = true;
    }
  }

  if (yDelta > 1 && !yMoved) {
    inter.y += ySign;
    if (xDelta > 0 && !xMoved) {
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

  const knots = new Array(10).fill(0).map((a) => ({ x: 0, y: 0 }));
  const tailSeen = new Set();
  tailSeen.add(`${0},${0}`);

  for (const inst of insts) {
    // Move head
    knots[0].x += inst.x;
    knots[0].y += inst.y;

    // Knots follow
    for (let i = 1; i < knots.length; i++) {
      knots[i] = stepTowards(knots[i], knots[i - 1]);
    }
    console.log(knots.map((a, i) => ({ i, ...a })));

    const tail = knots[knots.length - 1];
    tailSeen.add(`${tail.x},${tail.y}`);
  }

  console.log(tailSeen);
  return tailSeen.size;
};

suite("Day 09 - 2", main, [
  test("sample.txt", 1),
  test("sample2.txt", 36),
  test("real.txt"),
]);
