/**
 * Creates a `.cfg` file for JSON data
 * @param {String} filename
 * @param {String} block CFG File Block eg: client, database etc
 * @param {Object} params JS Object
 */
function writeConfigFile(filename, block, params) {
  const fs = require("fs");
  let dir = `/home/${process.env.USER}/rucio-settings`;
  
  if (process.env.RUCIO_SETTING_FILES_ROOT) {
    dir = process.env.RUCIO_SETTING_FILES_ROOT;
  }

  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir);
  }
  const location = dir + "/" + filename;

  fs.writeFile(location, `[${block}] \n`, (err) => {
    if (err) console.log(err);
  });

  Object.keys(params).forEach((item) => {
    fs.appendFile(location, `${item}: ${params[item]} \n`, (err) => {
      if (err) console.log(err);
    });
  });

  console.log(`[INFO] ${filename} created at ${location}`);
}

/**
 * Takes in `.cfg` file and converts it into `.json`
 * @param {String} filepath
 */
function parseConfigFile(filepath) {
  const fs = require("fs");
  let lines = [];
  const obj = {};

  function cleanString(string) {
    return string.trim().replace("https://", "");
  }

  fs.readFile(filepath, "utf8", (err, data) => {
    if (err) console.log(err);
    lines = data.trim().split(/\r?\n/).splice(1);
    lines.forEach((line) => {
      const cleanedLine = cleanString(line);
      const [key, value] = cleanedLine.split(":");
      obj[key] = value.trim();
    });
    fs.writeFile(filepath + ".json", JSON.stringify(obj), (error) => {
      if (error) console.log(error);
    });
  });
}

module.exports = { writeConfigFile, parseConfigFile };
