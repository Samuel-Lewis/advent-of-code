const { suite, test } = require("../common/test");

const detect = ({ segCodes, fourCodes }) => {
  const digs = {};

  segCodes.forEach((code) => {
    switch (code.length) {
      case 2:
        digs[code] = 1;
        break;
      case 4:
        digs[code] = 4;
        break;
      case 3:
        digs[code] = 7;
        break;
      case 7:
        digs[code] = 8;
        break;
      default:
        digs[code] = null;
        break;
    }
  });
  const fourCodesDec = fourCodes.map((code) => digs[code]);
  return { digs, segCodes, fourCodes, fourCodesDec };
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

  const count1_4_7_8 = lines
    .map((x) => x.fourCodesDec)
    .flat()
    .filter(Number);

  return count1_4_7_8.length;
};

suite("Day 08-1", main, [
  // test("sample_1.txt", 37),
  test("sample_simple.txt", 4),
  test("sample_2.txt", 26),
  test("real.txt"),
]);
