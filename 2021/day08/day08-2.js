const { suite, test } = require("../common/test");

const defaultLookup = {
  abcefg: 0,
  cf: 1,
  acdeg: 2,
  acdfg: 3,
  bcdf: 4,
  abdfg: 5,
  abdefg: 6,
  acf: 7,
  abcdefg: 8,
  abcdfg: 9,
};

const intersect = (codeA, codeB) => {
  const a = codeA.split("");
  const b = codeB.split("");
  const filteredArray = a
    .filter((x) => !b.includes(x))
    .concat(b.filter((x) => !a.includes(x)));
  if (filteredArray.length != 1) {
    console.error("Bad intersect", codeA, codeB, filteredArray);
  }
  return filteredArray[0];
};

const detect = ({ segCodes, fourCodes }) => {
  const digs = new Array(10).fill(null);
  const segCodesSort = segCodes
    .map((a) => a.split(""))
    .sort((a, b) => a.length - b.length)
    .map((a) => a.join(""));

  digs[1] = segCodesSort[0];
  digs[7] = segCodesSort[1];
  digs[4] = segCodesSort[2];
  digs[8] = segCodesSort[9];

  const segs = {};

  segs.a = intersect(digs[1], digs[7]);

  console.log(segs, digs);

  return { segCodes, fourCodes };
};

const main = (data) => {
  const lines = data
    .split("\n")
    .filter(String)
    .map((x) => x.split(" | "))
    .map(([segCodes, fourCodes]) => ({
      segCodes: segCodes.split(" ").map((c) => c.split("").sort().join("")),
      fourCodes: fourCodes.split(" ").map((c) => c.split("").sort().join("")),
    }))
    .map(detect);

  console.log(lines);

  // const nums = lines
  //   .map((a) => parseInt(a.fourCodesDec.join(""), 10))
  //   .reduce((acc, x) => acc + x, 0);

  return null;
};

suite("Day 08-2", main, [
  // test("sample_simple.txt", 4),
  test("sample_1.txt", 5353),
  test("sample_2.txt", 61229),
  test("real.txt"),
]);
