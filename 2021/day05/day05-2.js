const { suite, test } = require("../common/test");

const main = (data) => {
  let maxX = 0;
  let maxY = 0;
  const lines = data
    .split("\n")
    .filter(String)
    .map((l) => {
      const [start, end] = l.split(" -> ");
      const [startX, startY] = start.split(",").map((n) => parseInt(n));
      const [endX, endY] = end.split(",").map((n) => parseInt(n));
      maxX = Math.max(maxX, startX, endX);
      maxY = Math.max(maxY, startY, endY);
      return { startX, startY, endX, endY };
    });

  const grid = new Array(maxX + 1)
    .fill(null)
    .map(() => new Array(maxY + 1).fill(0));

  lines.forEach(({ startX, startY, endX, endY }) => {
    const dX = endX - startX;
    const dY = endY - startY;

    const signX = dX / Math.abs(dX);
    const signY = dY / Math.abs(dY);

    if (dX === 0) {
      for (let i = Math.min(startY, endY); i <= Math.max(startY, endY); i++) {
        grid[i][startX]++;
      }
      return;
    }

    if (dY === 0) {
      for (let i = Math.min(startX, endX); i <= Math.max(startX, endX); i++) {
        grid[startY][i]++;
      }
      return;
    }

    if (Math.abs(dX) !== Math.abs(dY)) {
      return;
    }

    for (
      let x = startX, y = startY;
      x !== endX && y !== endY;
      x += signX, y += signY
    ) {
      grid[y][x]++;
    }
    grid[endY][endX]++;
  });

  return grid.flat().filter((n) => n > 1).length;
};

suite("Day 05 - 1", main, [
  test("sample.txt", 12),
  test("sample_simple.txt"),
  test("real.txt"),
]);
