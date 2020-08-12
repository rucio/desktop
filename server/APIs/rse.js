const axios = require("axios");
const https = require("https");
const fs = require("fs");
const packageJSON = require("../../package.json");

/**
 * Gets all the available RSEs for a Rucio Server.
 * @param {String} certlocation
 * @param {{name: String, host: String, auth: String}} server
 * @param {String} token
 */
async function getRSEs(certlocation, server, token) {
  const httpsAgent = new https.Agent({ ca: fs.readFileSync(certlocation) });
  return axios
    .get(`https://${server.host}/rses/`, {
      httpsAgent,
      headers: {
        "User-Agent": `rucio-desktop/${packageJSON.version}`,
        "X-Rucio-Auth-Token": token,
      },
    })
    .then(console.log(`[INFO] RSE list retrieved for ${server.name}`));
}

module.exports = { getRSEs };
