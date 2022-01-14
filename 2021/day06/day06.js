const { suite, test } = require("../common/test");

const main = (data, generations = 18) => {
  const fish = data.split(",").map((x) => parseInt(x));

  const ageBuckets = new Array(9).fill(0);
  fish.forEach((f) => ageBuckets[f]++);

  for (let i = 0; i < generations; i++) {
    const front = ageBuckets.shift();
    ageBuckets.push(front);
    ageBuckets[6] += front;
  }

  return ageBuckets.reduce((a, b) => a + b, 0);
};

suite("Day 06", main, [
  test("sample.txt", 26, 18),
  test("sample.txt", 5934, 80),
  test("real.txt", null, 80),
]);
