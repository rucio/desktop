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
const { getFiles } = require("../APIs/files");
const router = express.Router();

router.post("/files", (req, res) => {
  const list = getFiles(req.body.folder);

  if (list === "FILE") {
    res.sendStatus(201);
    return;
  }

  if (list === null){
    res.sendStatus(404);
    return;
  }
  res.send(list).status(200);
});

module.exports = router;
