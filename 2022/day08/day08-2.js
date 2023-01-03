const { suite, test } = require("../common/test");
const { sum } = require("../common/math");

const EMPTY = {
  height: -1,
  visible: true,
  nMax: 0,
  nDist: 0,
  sMax: 0,
  sDist: 0,
  eMax: 0,
  eDist: 0,
  wMax: 0,
  wDist: 0,
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
      if (grid[i][j].height <= north.height) {
        grid[i][j].nDist = 0;
      } else {
        grid[i][j].nDist = north.nDist + 1;
      }
      grid[i][j].wMax = Math.max(west.height, west.wMax);
      if (grid[i][j].height <= west.wMax) {
        grid[i][j].wDist = 0;
      } else {
        grid[i][j].wDist = west.wDist + 1;
      }
    }
  }

  // Bottom -> top, right -> left
  for (let i = height - 1; i >= 0; i--) {
    for (let j = width - 1; j >= 0; j--) {
      const south = i < height - 1 ? grid[i + 1][j] : EMPTY;
      const east = j < width - 1 ? grid[i][j + 1] : EMPTY;
      grid[i][j].sMax = Math.max(south.height, south.sMax);
      if (grid[i][j].height <= south.sMax) {
        grid[i][j].sDist = 0;
      } else {
        grid[i][j].sDist = south.sDist + 1;
      }

      grid[i][j].eMax = Math.max(east.height, east.eMax);
      if (grid[i][j].height <= east.eMax) {
        grid[i][j].eDist = 0;
      } else {
        grid[i][j].eDist = east.eDist + 1;
      }
    }
  }

  // Count
  let max = 0;
  let deb = [];
  for (let i = 0; i < height; i++) {
    deb.push([]);
    for (let j = 0; j < width; j++) {
      const { nDist, sDist, eDist, wDist } = grid[i][j];
      const score = nDist * sDist * eDist * wDist;
      max = Math.max(score, max);
      deb[i].push(score);
    }
  }
  console.log(grid);
  // console.log(deb);
  return max;
};

suite("Day 08 - 2", main, [test("sample.txt", 8), test("real.txt")]);
