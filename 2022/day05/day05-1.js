const { suite, test } = require("../common/test");

const getStacks = (lines) => {
  const crateStacks = [];
  lines
    .filter((line) => line.trim().startsWith("["))
    .map((line) =>
      line.split("").reduce((acc, char, index) => {
        if ((index - 1) % 4 === 0) {
          acc.push(char === " " ? null : char);
        }
        return acc;
      }, [])
    )
    .forEach((line) => {
      line.forEach((char, index) => {
        if (char) {
          if (!crateStacks[index]) {
            crateStacks[index] = [];
          }
          crateStacks[index].push(char);
        }
      });
    });
  return crateStacks;
};

const simulate = (stack, inst) => {
  const { from, to } = inst;
  // Remove front from stack
  console.log(stack[from]);
  const mover = stack[from].shift();
  stack[to].unshift(mover);
  return stack;
};

const main = (data) => {
  const lines = data.split("\n");

  const stacks = getStacks(lines);
  const instructions = lines
    .filter((line) => line.trim().startsWith("move"))
    .map((line) => {
      const [, qty, , from, , to] = line.split(" ").map(Number);
      return { qty, from: from - 1, to: to - 1 };
    })
    .reduce((acc, inst) => {
      const { qty, from, to } = inst;
      const spread = new Array(qty).fill({ from, to });
      return [...acc, ...spread];
    }, []);

  let newStacks = stacks;
  instructions.forEach((inst) => {
    newStacks = simulate(newStacks, inst);
  });

  // Get top crates of each stack
  const topCrates = newStacks.map((stack) => stack[0]).join("");

  return topCrates;
};

suite("Day 05 - 1", main, [test("sample.txt", "CMZ"), test("real.txt")]);
