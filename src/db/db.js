const fs = require("fs");

/**
 * Reads the file with the given file name as JSON, and parses it into a JavaScript object.
 *
 * @param {string} fileName the file to read
 * @returns the parsed object from the JSON file
 */
function readJson(fileName) {
  const data = fs.readFileSync(fileName);
  return JSON.parse(data.toString("utf-8"));
}

/**
 * Writes the given JavaScript object as JSON to the given file.
 *
 * @param {any} object the object to write
 * @param {string} fileName the file
 */
function writeJson(object, fileName) {
  fs.writeFileSync(fileName, JSON.stringify(object));
}

module.exports = {
  readJson,
  writeJson,
};
