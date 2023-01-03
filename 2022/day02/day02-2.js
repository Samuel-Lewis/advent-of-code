const { suite, test } = require("../common/test");
const { summary, sum } = require("../common/math");

const ROCK = "A";
const PAPER = "B";
const SCISSORS = "C";
const DRAW = "draw";
const WIN = "win";
const LOSS = "loss";

const scores = {
  [ROCK]: 1,
  [PAPER]: 2,
  [SCISSORS]: 3,
  [LOSS]: 0,
  [DRAW]: 3,
  [WIN]: 6,
};

const key = {
  A: ROCK,
  B: PAPER,
  C: SCISSORS,
  X: ROCK,
  Y: PAPER,
  Z: SCISSORS,
};

const win = {
  X: LOSS,
  Y: DRAW,
  Z: WIN,
};

const compliment = (a, b) => {
  const aPlay = key[a];
  const winCondition = win[b];

  if (winCondition === DRAW) {
    return aPlay;
  }

  if (winCondition == LOSS) {
    if (aPlay === ROCK) {
      return SCISSORS;
    }
    if (aPlay === SCISSORS) {
      return PAPER;
    }
    if (aPlay === PAPER) {
      return ROCK;
    }
  }

  if (winCondition == WIN) {
    if (aPlay === ROCK) {
      return PAPER;
    }
    if (aPlay === SCISSORS) {
      return ROCK;
    }
    if (aPlay === PAPER) {
      return SCISSORS;
    }
  }
};

const winner = (a, b) => {
  const aPlay = key[a];
  const bPlay = key[b];

  if (aPlay === bPlay) {
    return DRAW;
  }
  if (aPlay === ROCK && bPlay === SCISSORS) {
    return WIN;
  }
  if (aPlay === SCISSORS && bPlay === PAPER) {
    return WIN;
  }
  if (aPlay === PAPER && bPlay === ROCK) {
    return WIN;
  }
  return LOSS;
};

const main = (data) => {
  const moves = data
    .split("\n")
    .filter(String)
    .map((line) => line.split(" "));

  const sneakyMove = moves.map(([a, b]) => [a, compliment(a, b)]);
  const roundScore = sneakyMove.map(([a, b]) => scores[winner(b, a)]);
  const moveScore = sneakyMove.map(([_, b]) => scores[key[b]]);

  return sum(roundScore) + sum(moveScore);
};

suite("Day 02 - 1", main, [test("sample.txt", 12), test("real.txt")]);
