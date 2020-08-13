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

/**
 * Gets settings and protocols of an `rse` for a Rucio Server.
 * @param {String} certlocation
 * @param {{name: String, host: String, auth: String}} server
 * @param {String} token
 * @param {String} rse Valid Rucio Storage Element (RSE) Name
 */
async function info(certlocation, server, token, rse) {
  const httpsAgent = new https.Agent({ ca: fs.readFileSync(certlocation) });

  return axios
    .get(`https://${server.host}/rses/${rse}`, {
      httpsAgent,
      headers: {
        "User-Agent": `rucio-desktop/${packageJSON.version}`,
        "X-Rucio-Auth-Token": token,
      },
    })
    .then(console.log(`[INFO] Info retreived for ${rse} from ${server.name}`));
}

/**
 * Gets attributes of an `rse` for a Rucio Server.
 * @param {String} certlocation
 * @param {{name: String, host: String, auth: String}} server
 * @param {String} token
 * @param {String} rse Valid Rucio Storage Element (RSE) Name
 */
async function attributes(certlocation, server, token, rse) {
  const httpsAgent = new https.Agent({ ca: fs.readFileSync(certlocation) });

  return axios
    .get(`https://${server.host}/rses/${rse}/attr/`, {
      httpsAgent,
      headers: {
        "User-Agent": `rucio-desktop/${packageJSON.version}`,
        "X-Rucio-Auth-Token": token,
      },
    })
    .then(
      console.log(`[INFO] Attributes retreived for ${rse} from ${server.name}`)
    );
}

/**
 * Gets only protocols of an `rse` for a Rucio Server.
 * @param {String} certlocation
 * @param {{name: String, host: String, auth: String}} server
 * @param {String} token
 * @param {String} rse Valid Rucio Storage Element (RSE) Name
 */
async function protocols(certlocation, server, token, rse) {
  const httpsAgent = new https.Agent({ ca: fs.readFileSync(certlocation) });

  return axios
    .get(`https://${server.host}/rses/${rse}/protocols`, {
      httpsAgent,
      headers: {
        "User-Agent": `rucio-desktop/${packageJSON.version}`,
        "X-Rucio-Auth-Token": token,
      },
    })
    .then(
      console.log(`[INFO] Protocols retreived for ${rse} from ${server.name}`)
    );
}

/**
 * Gets usage of an `rse` for a Rucio Server.
 * @param {String} certlocation
 * @param {{name: String, host: String, auth: String}} server
 * @param {String} token
 * @param {String} rse Valid Rucio Storage Element (RSE) Name
 */
async function usage(certlocation, server, token, rse) {
  const httpsAgent = new https.Agent({ ca: fs.readFileSync(certlocation) });

  return axios
    .get(`https://${server.host}/rses/${rse}/usage`, {
      httpsAgent,
      headers: {
        "User-Agent": `rucio-desktop/${packageJSON.version}`,
        "X-Rucio-Auth-Token": token,
      },
    })
    .then(
      console.log(`[INFO] RSE Usage retreived for ${rse} from ${server.name}`)
    );
}

/**
 * Gets limits of an `rse` for a Rucio Server.
 * @param {String} certlocation
 * @param {{name: String, host: String, auth: String}} server
 * @param {String} token
 * @param {String} rse Valid Rucio Storage Element (RSE) Name
 */
async function limits(certlocation, server, token, rse) {
  const httpsAgent = new https.Agent({ ca: fs.readFileSync(certlocation) });

  return axios
    .get(`https://${server.host}/rses/${rse}/limits`, {
      httpsAgent,
      headers: {
        "User-Agent": `rucio-desktop/${packageJSON.version}`,
        "X-Rucio-Auth-Token": token,
      },
    })
    .then(
      console.log(`[INFO] RSE Limits retreived for ${rse} from ${server.name}`)
    );
}

async function accountLimits(certlocation, server, token, rse) {
  const httpsAgent = new https.Agent({ ca: fs.readFileSync(certlocation) });

  return axios
    .get(`https://${server.host}//rses/${rse}/accounts/usage`, {
      httpsAgent,
      headers: {
        "User-Agent": `rucio-desktop/${packageJSON.version}`,
        "X-Rucio-Auth-Token": token,
      },
    })
    .then(
      console.log(
        `[INFO] Account Limits retreived for ${rse} from ${server.name}`
      )
    );
}

function processResponseData(data){
  const res = []
  const processedData = data.trim().split("\n")
  for (let i = 0; i < processedData.length; i++){
    res.push(JSON.parse(processedData[i]))
  }
  
  return res
}

module.exports = {
  getRSEs,
  info,
  attributes,
  protocols,
  usage,
  limits,
  accountLimits,
  processResponseData
};
