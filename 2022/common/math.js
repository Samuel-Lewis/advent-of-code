const sum = (a) => a.reduce((a, b) => a + b, 0);

const summary = (array) => {
  const max = {
    value: array[0],
    index: 0,
  };

  const min = {
    value: array[0],
    index: 0,
  };

  let sum = 0;

  for (let i = 0; i < array.length; i++) {
    const value = array[i];
    sum += value;

    if (value > max.value) {
      max.value = value;
      max.index = i;
    }

    if (value < min.value) {
      min.value = value;
      min.index = i;
    }
  }

  const sorted = array.slice().sort((a, b) => a - b);

  return {
    max,
    min,
    sum,
    sorted,
    sortedReverse: sorted.reverse(),
  };
};

module.exports = {
  summary,
  sum,
};
