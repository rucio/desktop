const axios = require("axios");
const https = require("https");
const fs = require("fs");
const superagent = require("superagent");
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

/**
 * Converts the String type response recieved from Rucio Server to parsable JSON.
 * @param {String} data
 */
function processResponseData(data) {
  const res = [];
  const processedData = data.trim().split("\n");
  for (let i = 0; i < processedData.length; i++) {
    res.push(JSON.parse(processedData[i]));
  }

  return res;
}

/**
 *  Attempts to DELETE a protocol for an RSE.
 * @param {String} certlocation
 * @param {{name: String, host: String, auth: String}} server
 * @param {String} token
 * @param {String} rse RSE Name
 * @param {String} scheme RSE Protocol Scheme
 * @param {String} hostname RSE Protocol Hostname
 * @param {String} port RSE Protocol PORT
 */
async function deleteProtocol(
  certlocation,
  server,
  token,
  rse,
  scheme,
  hostname,
  port
) {
  const httpsAgent = new https.Agent({ ca: fs.readFileSync(certlocation) });
  console.log(rse, scheme, hostname, port);
  return axios
    .delete(
      `https://${server.host}/rses/${rse}/protocols/${scheme}/${hostname}/${port}`,
      {
        headers: {
          "User-Agent": `rucio-desktop/${packageJSON.version}`,
          "X-Rucio-Auth-Token": token,
        },
        httpsAgent,
      }
    )
    .then(() => {
      console.log(
        `[INFO] Deleted Protocol ${scheme}-${hostname}:${port} for ${rse}`
      );
    });
}

/**
 * Attempts to add a new protocol with `scheme` for given `rse`.
 * @param {String} certlocation
 * @param {{name: String, host: String, auth: String}} server
 * @param {String} token
 * @param {String} rse RSE name
 * @param {String} scheme RSE Protocol Scheme
 * @param {Object} protocolObj RSE Protocol Parameters
 */
async function addProtocol(
  certlocation,
  server,
  token,
  rse,
  scheme,
  protocolObj
) {
  return superagent
    .post(`https://${server.host}/rses/${rse}/protocols/${scheme}`)
    .set("X-Rucio-Auth-Token", token)
    .set("User-Agent", `rucio-desktop/${packageJSON.version}`)
    .ca(fs.readFileSync(certlocation))
    .send(protocolObj)
    .ok((res) => {
      console.log(`[INFO] Added new protocol with scheme=${scheme} for ${rse}`);
      return res.status === 201;
    })
    .on("error", (res) => {
      console.log(res);
      res.status === 401
        ? console.log("[ERROR] Invalid Credentials")
        : console.log("[ERROR] Internal Server Error");
    });
}

module.exports = {
  getRSEs,
  info,
  attributes,
  protocols,
  usage,
  limits,
  accountLimits,
  processResponseData,
  deleteProtocol,
  addProtocol,
};
