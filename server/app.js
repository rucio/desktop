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
const cors = require("cors");
const port = 3004;
const app = express();
const files = require("./routes/files");
const metadata = require("./routes/metadata");
const auth = require("./routes/auth");
const config = require("./routes/config");
const usercfg = require("./routes/usercfgs");
const rse = require("./routes/rse");

app.use(cors({ origin: "http://localhost:3005" }));
app.use(express.json());
app.use(auth);
app.use(files);
app.use(metadata);
app.use(config);
app.use(usercfg);
app.use(rse);

app.listen(port, () =>
  console.log(`[INFO] Rucio running at http://localhost:${port}`)
);
