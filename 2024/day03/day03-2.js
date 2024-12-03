const { suite, test } = require("../common/test");
const { summary, sum } = require("../common/math");

const main = (data) => {
  const mulString = data.split("\n").filter(String).join("");
  data = `do()${mulString}don't()`;

  const splitRegex = /do\(\)(.*?)don't\(\)/g;

  const segments = data.matchAll(splitRegex);

  // Combine segments into new string
  let combined = "";
  for (const segment of segments) {
    combined += segment[1];
  }

  const regex = /mul\((\d+),(\d+)\)/g;
  let count = 0;

  const matches = combined.matchAll(regex);
  for (const match of matches) {
    const [_, a, b] = match;
    count += a * b;
  }

  return count;
};

suite("Day 03 - 2", main, [test("sample2.txt", 48), test("real.txt")]);
