const fs = require("fs");
var path = require("path");

/**
 * Updates the Settings-lock file with `requestPayload`
 * @param {Object} requestPayload
 * @param {String} component Component Changed
 */
function updateChangelog(requestPayload = {}, component) {
  const lockfilePath = path.join(__dirname, "..", "settings-lock.json");

  let lockfile;
  try {
    lockfile = fs.readFileSync(lockfilePath, "utf-8");
  } catch (e) {
    fs.writeFileSync(lockfilePath, JSON.stringify([]), "utf-8");
    lockfile = fs.readFileSync(lockfilePath, "utf-8");
  }

  const changelog = JSON.parse(lockfile);

  const version =
    changelog.length === 0
      ? 1
      : parseInt(changelog[0].version) + 1;

  const date = new Date();
  const changeObj = {
    version: version.toString(),
    timestamp: date.toString(),
    rse: requestPayload.rse,
    rse_id: requestPayload.rse_id,
    initial: requestPayload.initialValues,
    changed: requestPayload.protocolObj || requestPayload.params,
    component: component,
  };

  changelog.unshift(changeObj);
  const toWrite = JSON.stringify(changelog);

  fs.writeFileSync(lockfilePath, toWrite, "utf-8");
  console.log(
    `[INFO] Changes for ${component}:v${changeObj.version} written to settings-lock.json`
  );
}

async function getChangelog(rseId) {
  const lockfilePath = path.join(__dirname, "..", "settings-lock.json");

  let lockfile;
  try {
    lockfile = fs.readFileSync(lockfilePath, "utf-8");
  } catch (e) {
    return false;
  }

  const changelog = JSON.parse(lockfile);

  const newList = changelog.filter((item) =>
    item.rse_id.toLowerCase().includes(rseId.toLowerCase())
  );

  return newList;
}

module.exports = { updateChangelog, getChangelog };
