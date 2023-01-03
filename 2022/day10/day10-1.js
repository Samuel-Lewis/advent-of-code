const { suite, test } = require("../common/test");
const { sum } = require("../common/math");

const noop = (register, value) => {
  return register;
};

const addx = (register, value) => {
  return register + value;
};

const main = (data) => {
  const insts = data
    .split("\n")
    .filter(String)
    .flatMap((l) => {
      const [cmd, value] = l.split(" ");

      const empty = { cmd: "noop", value: 0, op: noop };
      switch (cmd) {
        case "noop":
          return [empty];
        case "addx":
          return [empty, { cmd, value: Number(value), op: addx }];
      }
    });

  const mils = [];
  let register = 1;
  for (let i = 0; i < insts.length; i++) {
    const inst = insts[i];

    const score = i * register;
    if ((i + 20) % 40 === 0) {
      mils.push(score);
      console.log("****");
    }
    console.log({ i, register, score, inst: `${inst.cmd} ${inst.value}` });
    if ((i + 20) % 40 === 0) {
      console.log("****");
    }

    register = inst.op(register, inst.value);
  }
  return sum(mils);
};

suite("Day 10 - 1", main, [test("sample.txt", 13140), test("real.txt")]);
