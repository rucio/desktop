const axios = require("axios");
const https = require("https");
const fs = require("fs");

/**
 * Retreives DID Metadata from Rucio Server
 * @param {String} certlocation path to user certificate.
 * @param {String} hostAddress hostname for Rucio Server to get metadata from.
 * @param {String} token valid RUCIO-AUTH-TOKEN from server
 * @param {String} scope Scope containing the DID
 * @param {String} did DID name
 */
async function getDIDmeta(certlocation, hostAddress, token, scope, did) {
  const httpsAgent = new https.Agent({ ca: fs.readFileSync(certlocation) });
  return axios
    .get(`https://${hostAddress}/dids/${scope}/${did}`, {
      httpsAgent,
      headers: { "X-Rucio-Auth-Token": token },
    })
    .then(
      console.log(
        `[INFO] Metadata received for ${scope}:${did} from ${hostAddress}`
      )
    );
}

module.exports = getDIDmeta;
