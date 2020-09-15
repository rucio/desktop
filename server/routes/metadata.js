/*
 * Copyright European Organization for Nuclear Research (CERN)
 * Licensed under the Apache License, Version 2.0 (the "License");
 * You may not use this file except in compliance with the License.
 * You may obtain a copy of the License at http://www.apache.org/licenses/LICENSE-2.0
 * 
 * Authors:
 * - Vivek Nigam, <viveknigam.nigam3@gmail.com>, 2020
 */

const express = require("express");
const getDIDmeta = require("../APIs/metadata");
const router = express.Router();

router.post("/metadata", async (req, res) => {
  const payload = req.body.payload;

  await getDIDmeta(
    payload.certlocation,
    payload.serverHost,
    payload.token,
    payload.scope,
    payload.did
  )
    .then((metadata) => {
      res.json(metadata.data);
    })
    .catch((err) => {
      console.log(`[ERROR] ` + err);
      res.sendStatus(401);
    });
});

module.exports = router;
