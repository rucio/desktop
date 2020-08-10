const axios = require("axios");
const https = require("https");
const fs = require("fs");

/**
 * Attempts to get RUCIO_AUTH_TOKEN for a server using USERPASS Strategy.
 * @param {Request} req
 * @param {Response} res
 * @param {Object} credentials
 */
async function getTokenWithUserpass(req, res, credentials) {
  const httpsAgent = new https.Agent({
    ca: fs.readFileSync(credentials.ca_cert),
  });
  return axios
    .get(`https://${credentials.auth_host}/auth/userpass`, {
      httpsAgent,
      headers: {
        "X-Rucio-Account": credentials.account,
        "X-Rucio-Username": credentials.username,
        "X-Rucio-Password": credentials.password,
      },
    })
    .then((response) => {
      const RUCIO_TOKEN = response.headers["x-rucio-auth-token"];
      res.cookie(`${credentials.server_name}`, RUCIO_TOKEN, {
        maxAge: 60 * 60 * 1000, // 1-Hour
      });
      return true;
    })
    .catch((err) => {
      console.log(`[DEBUG] ${err}`);
      return false;
    });
}

/**
 * Attempts to get RUCIO_AUTH_TOKEN for a server using USERPASS Strategy.
 * @param {Request} req
 * @param {Response} res
 * @param {Object} credentials
 */
async function getTokenWithX509(req, res, credentials) {
  const httpsAgent = new https.Agent({
    ca: fs.readFileSync(credentials.ca_cert),
    cert: fs.readFileSync(credentials.client_cert),
    key: fs.readFileSync(credentials.client_key),
    headers: {
      "X-Rucio-Account": credentials.account,
    },
  });

  return axios
    .get(`https://${credentials.auth_host}/auth/x509`, {
      httpsAgent,
    })
    .then((response) => {
      const RUCIO_TOKEN = response.headers["x-rucio-auth-token"];
      res.cookie(`${credentials.server_name}`, RUCIO_TOKEN, {
        maxAge: 60 * 60 * 1000, // 1-Hour
      });
      return true;
    })
    .catch((err) => {
      console.log(`[DEBUG] ${err}`);
      return false;
    });
}

module.exports = { getTokenWithUserpass, getTokenWithX509 };
