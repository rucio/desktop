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
const userApi = require("../APIs/user");
const router = express.Router();

router.post("/savecfg", (req, res) => {
    // payload = {filepath: String, block: String, params: Object}
    const filepath = req.body.payload.filepath;
    const block = req.body.payload.block;
    const params = req.body.payload.params;
    
    userApi.writeConfigFile(filepath, block, params)
    res.sendStatus(200);
})

router.post("/uploadcfg", (req, res) => {
    // payload = {filepath: String}
    const fs = require('fs');
    const file = req.body.payload.filepath;
   
    userApi.parseConfigFile(file);
    fs.readFile(file+".json", "utf8", (err, data) => {
        if (err) {
            console.log(`[ERROR /uploadcfg]: ${err}`);
            return res.sendStatus(500)
        }
        res.send(data).status(200)
    })
})

module.exports = router;