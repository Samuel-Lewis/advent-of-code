const printGrid = (grid, name) => {
  const label = name !== undefined ? `==[ ${name} ]` : "";
  const border = label.padEnd(grid[0].length, "=");
  const display = grid
    .map((row) => row.join(""))
    .join("\n")
    .replace(/0/g, ".");
  console.log(border);
  console.log(display);
};

const printArray = (array, name, delim = ",") => {
  const label = name !== undefined ? `==[ ${name} ]` : "";
  const display = array.join(delim);
  const border = label.padEnd(display.length, "=");
  const stats = {
    length: array.length,
    min: Math.min(...array),
    max: Math.max(...array),
    sum: array.reduce((a, b) => a + b, 0),
  };
  console.log(border);
  console.log(stats);
  console.log(display);
};

module.exports = { printGrid, printArray };
