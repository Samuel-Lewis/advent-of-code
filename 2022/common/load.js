const fs = require("fs");

const { argv, exit } = process;
const [, , inputFile] = argv;

const load = (path = inputFile) => {
  if (!path) {
    console.error("No input file specified", { path });
    exit(1);
  }

  return fs.readFileSync(path, "utf8");
};

module.exports = load;
