const { suite, test } = require("../common/test");

const simulateDir = (board, match = ">", [dY, dX] = [0, 1]) => {
  const height = board.length;
  const width = board[0].length;

  const newBoard = board.map((a) => a.slice());

  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      const p = board[y][x];

      const [nY, nX] = [(dY + y) % height, (dX + x) % width];
      const nP = board[nY][nX];

      if (p === match && nP === ".") {
        newBoard[nY][nX] = match;
        newBoard[y][x] = ".";
      }
    }
  }
  return newBoard;
};

const simulate = (board) => {
  const subBoard = simulateDir(board, ">", [0, 1]);
  const newBoard = simulateDir(subBoard, "v", [1, 0]);

  const newString = newBoard.map((row) => row.join("")).join("\n");
  const oldString = board.map((row) => row.join("")).join("\n");

  return { updated: newString !== oldString, newBoard };
};

const main = (data) => {
  const board = data
    .split("\n")
    .filter(String)
    .map((row) => row.split(""));

  let b = { newBoard: board, updated: true };

  let gen = 1;
  while (b.updated) {
    b = simulate(b.newBoard);
    gen++;
  }
  return gen - 1;
};

suite("Day 25", main, [test("sample.txt", 58), test("real.txt")]);
