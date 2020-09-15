/*
 * Copyright European Organization for Nuclear Research (CERN)
 * Licensed under the Apache License, Version 2.0 (the "License");
 * You may not use this file except in compliance with the License.
 * You may obtain a copy of the License at http://www.apache.org/licenses/LICENSE-2.0
 * 
 * Authors:
 * - Vivek Nigam, <viveknigam.nigam3@gmail.com>, 2020
 */

const axios = require("axios");
const https = require("https");
const fs = require("fs");
const packageJSON = require("../../package.json");

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
      headers: {
        "User-Agent": `rucio-desktop/${packageJSON.version}`,
        "X-Rucio-Auth-Token": token,
      },
    })
    .then(
      console.log(
        `[INFO] Metadata received for ${scope}:${did} from ${hostAddress}`
      )
    );
}

module.exports = getDIDmeta;
