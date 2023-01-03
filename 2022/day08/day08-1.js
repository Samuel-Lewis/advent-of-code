const { suite, test } = require("../common/test");
const { sum } = require("../common/math");

const EMPTY = {
  height: -1,
  visible: true,
  nMax: -1,
  sMax: -1,
  eMax: -1,
  wMax: -1,
};

const main = (data) => {
  const grid = data
    .split("\n")
    .filter(String)
    .map((line) =>
      line.split("").map((n) => ({
        ...EMPTY,
        height: Number(n),
        visible: null,
      }))
    );

  const width = grid[0].length;
  const height = grid.length;

  // Top -> bottom, left -> right
  for (let i = 0; i < height; i++) {
    for (let j = 0; j < width; j++) {
      const north = i > 0 ? grid[i - 1][j] : EMPTY;
      const west = j > 0 ? grid[i][j - 1] : EMPTY;
      grid[i][j].nMax = Math.max(north.height, north.nMax);
      grid[i][j].wMax = Math.max(west.height, west.wMax);
    }
  }

  // Bottom -> top, right -> left
  for (let i = height - 1; i >= 0; i--) {
    for (let j = width - 1; j >= 0; j--) {
      const south = i < height - 1 ? grid[i + 1][j] : EMPTY;
      const east = j < width - 1 ? grid[i][j + 1] : EMPTY;
      grid[i][j].sMax = Math.max(south.height, south.sMax);
      grid[i][j].eMax = Math.max(east.height, east.eMax);
    }
  }

  // Count
  let count = 0;
  for (let i = 0; i < height; i++) {
    for (let j = 0; j < width; j++) {
      const { nMax, sMax, eMax, wMax, height } = grid[i][j];
      const visible =
        height > nMax || height > sMax || height > eMax || height > wMax;
      grid[i][j].visible = visible;
      if (visible) {
        count++;
      }
    }
  }

  return count;
};

suite("Day 08 - 1", main, [test("sample.txt", 21), test("real.txt")]);
