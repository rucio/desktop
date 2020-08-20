const fs = require("fs");
var path = require("path");

function updateChangelog(requestPayload = {}, component) {
  const lockfilePath = path.join(__dirname, "..", "settings-lock.json");

  const lockfile = fs.readFileSync(lockfilePath, "utf-8");
  const changelog = JSON.parse(lockfile);
  
  const version =
    changelog.length === 0
      ? 1
      : parseInt(changelog[changelog.length - 1].version) + 1;

  const date = new Date();
  const changeObj = {
    version: version.toString(),
    timestamp: date.toUTCString(),
    server: requestPayload.server,
    rse: requestPayload.rse,
    scheme: requestPayload.scheme,
    hostname: requestPayload.hostname,
    port: requestPayload.port,
    initial: requestPayload.initialValues,
    changed: requestPayload.protocolObj,
    component: component,
  };

  changelog.push(changeObj);
  const toWrite = JSON.stringify(changelog);

  fs.writeFileSync(lockfilePath, toWrite, "utf-8");
  console.log(
    `[INFO] Changes for ${component}:v${changeObj.version} written to settings-lock.json`
  );
}

module.exports = { updateChangelog };
