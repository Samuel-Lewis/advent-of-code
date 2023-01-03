const { suite, test } = require("../common/test");
const { summary } = require("../common/math");

const MAX_SIZE = 70000000;
const UPDATE_SIZE = 30000000;

const CD = "cd";
const DIR = "dir";
const SIZE = "size";

class File {
  name = "";
  _size = null;
  path = [];

  constructor(n, s, p) {
    this.name = n;
    this._size = s;
    this.path = p;
  }

  getSize = () => {
    return this._size;
  };
}

class Directory {
  name = null;
  children = [];
  path = [];
  _size = null;

  constructor(n, c, p) {
    this.name = n;
    this.children = c;
    this.path = p;
  }

  getSize = () => {
    if (this._size !== null) {
      return this._size;
    }

    this._size = this.children.reduce((acc, cur) => acc + cur.getSize(), 0);
    return this._size;
  };
}

/**
 * Directory
 * name: string
 * children: File[]
 * parent: Directory
 * size: number | null
 */

const interpret = (tokens) => {
  let cmd = null;
  let arg = null;
  let size = null;

  if (tokens[0] === "$") {
    // cd, ls
    cmd = tokens[1];
    if (cmd === CD) {
      // cd <dir>
      arg = tokens[2];
    }
  } else if (tokens[0] === DIR) {
    // dir
    cmd = DIR;
    // dir <arg>
    arg = tokens[1];
  } else {
    // <size> <arg>
    cmd = SIZE;
    size = Number(tokens[0]);
    arg = tokens[1];
  }

  return {
    cmd,
    arg,
    size,
  };
};

const main = (data) => {
  const lines = data
    .split("\n")
    .filter(String)
    .map((line) => line.split(" "))
    .map(interpret);

  const path = [];
  const allFiles = {};
  const allDirs = {
    "/": new Directory("/", [], ["/"]),
  };
  lines.forEach((line) => {
    switch (line.cmd) {
      case CD:
        if (line.arg === "..") {
          path.pop();
        } else {
          path.push(line.arg);
        }
        break;
      case DIR:
        // Create new child dir
        const newDirPath = [...path, line.arg];
        const newDirPathKey = newDirPath.join(" ");
        if (!allDirs[newDirPathKey]) {
          allDirs[newDirPathKey] = new Directory(line.arg, [], newDirPath);
        }

        allDirs[path.join(" ")].children.push(allDirs[newDirPathKey]);

        break;
      case SIZE:
        // Create new child dir
        const newFilePath = [...path, line.arg];
        const newFilePathKey = newFilePath.join(" ");
        if (!allFiles[newFilePathKey]) {
          allFiles[newFilePathKey] = new File(line.arg, line.size, newFilePath);
        }

        allDirs[path.join(" ")].children.push(allFiles[newFilePathKey]);
        break;

      default:
        // console.error("huh??", { line });
        break;
    }
  });
  console.log(allDirs);

  // Force size calc
  const totalSize = allDirs["/"].getSize();
  const smallDirs = Object.values(allDirs)
    .filter((dir) => {
      const size = dir.getSize();
      return totalSize + UPDATE_SIZE - size < MAX_SIZE;
    })
    .map((dir) => dir.getSize());
  return summary(smallDirs).min.value;
};

suite("Day 07 - 2", main, [test("sample.txt", 24933642), test("real.txt")]);
