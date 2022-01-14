const load = require("./load");

const suite = (label, main, cases) => {
  console.group(label);
  for (let c of cases) {
    if (!c(main)) {
      break;
    }
  }
  console.groupEnd();
};

const test =
  (inputFile, expected = null, ...rest) =>
  (main) => {
    console.group("Testing", inputFile);
    const data = load(inputFile);
    const actual = main(data, ...rest);

    let pass = true;

    if (expected) {
      if (expected === actual) {
        console.log("Pass ✔️");
      } else {
        console.log("Fail ❌");
        console.log("- Expected", expected);
        pass = false;
      }
    } else {
      console.log("Done 💡");
    }
    console.log("- Result", actual);
    console.groupEnd();
    return pass;
  };

module.exports = {
  suite,
  test,
};
