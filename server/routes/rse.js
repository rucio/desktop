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
const RSE = require("../APIs/rse");
const changelog = require("../APIs/rse-versions");
const router = express.Router();

router.post("/rses", async (req, res) => {
  const payload = req.body.payload;

  await RSE.getRSEs(payload.certlocation, payload.server, payload.token)
    .then((rseList) => res.send(RSE.processResponseData(rseList.data)))
    .catch((err) => {
      console.log(`[ERROR: /rses] ${err}`);
      res.sendStatus(err.response.status);
    });
});

router.post("/rse/info", async (req, res) => {
  const payload = req.body.payload;

  await RSE.info(
    payload.certlocation,
    payload.server,
    payload.token,
    payload.rse
  )
    .then((info) => res.send(info.data))
    .catch((err) => {
      console.log(`[ERROR: /rse/info] ${err}`);
      res.sendStatus(err.response.status);
    });
});

router.post("/rse/attr", async (req, res) => {
  const payload = req.body.payload;

  await RSE.attributes(
    payload.certlocation,
    payload.server,
    payload.token,
    payload.rse
  )
    .then((attr) => res.send(attr.data))
    .catch((err) => {
      console.log(`[ERROR: /rse/attr] ${err}`);
      res.sendStatus(err.response.status);
    });
});

router.post("/rse/protocols", async (req, res) => {
  const payload = req.body.payload;

  await RSE.protocols(
    payload.certlocation,
    payload.server,
    payload.token,
    payload.rse
  )
    .then((protocols) => res.send(protocols.data))
    .catch((err) => {
      console.log(`[ERROR: /rse/protocols] ${err}`);
      res.sendStatus(err.response.status);
    });
});

router.post("/rse/usage", async (req, res) => {
  const payload = req.body.payload;

  await RSE.usage(
    payload.certlocation,
    payload.server,
    payload.token,
    payload.rse
  )
    .then((usage) => res.send(usage.data))
    .catch((err) => {
      console.log(`[ERROR: /rse/usage] ${err}`);
      res.sendStatus(err.response.status);
    });
});

router.post("/rse/limits", async (req, res) => {
  const payload = req.body.payload;

  await RSE.limits(
    payload.certlocation,
    payload.server,
    payload.token,
    payload.rse
  )
    .then((limits) => res.send(limits.data))
    .catch((err) => {
      console.log(`[ERROR: /rse/limits] ${err}`);
      res.sendStatus(err.response.status);
    });
});

router.post("/rse/account/limits", async (req, res) => {
  const payload = req.body.payload;

  await RSE.accountLimits(
    payload.certlocation,
    payload.server,
    payload.token,
    payload.rse
  )
    .then((accLimits) => res.send(accLimits.data))
    .catch((err) => {
      console.log(`[ERROR: /rse/account/limits] ${err}`);
      res.sendStatus(err.response.status);
    });
});

router.post("/rse/protocol/update", async (req, res) => {
  const payload = req.body.payload;

  await RSE.deleteProtocol(
    payload.certlocation,
    payload.server,
    payload.token,
    payload.rse,
    payload.scheme,
    payload.hostname,
    payload.port
  )
    .then(async () => {
      await RSE.addProtocol(
        payload.certlocation,
        payload.server,
        payload.token,
        payload.rse,
        payload.scheme,
        payload.protocolObj
      )
        .then(() => {
          console.log("[INFO] RSE Protocol Updated.");
          changelog.updateChangelog(req.body.payload, "protocol");
          res.sendStatus(200);
        })
        .catch((err) => {
          console.log(`[ERROR: /rse/protocol/update | add] ${err}`);
          res.sendStatus(500);
        });
    })
    .catch((err) => {
      console.log(`[ERROR: /rse/protocol/update | delete] ${err}`);
      res.sendStatus(500);
    });
});

router.post("/rse/protocol/delete", async (req, res) => {
  const payload = req.body.payload;

  await RSE.deleteProtocol(
    payload.certlocation,
    payload.server,
    payload.token,
    payload.rse,
    payload.scheme,
    payload.hostname,
    payload.port
  )
    .then((info) => {
      console.log(info);
      res.sendStatus(200);
    })
    .catch((err) => {
      console.log(`[ERROR: /rse/protocol/delete] ${err}`);
      res.sendStatus(500);
    });
});

router.post("/rse/protocol/add", async (req, res) => {
  const payload = req.body.payload;

  await RSE.addProtocol(
    payload.certlocation,
    payload.server,
    payload.token,
    payload.rse,
    payload.scheme,
    payload.protocolObj
  )
    .then(() => res.sendStatus(200))
    .catch((err) => {
      console.log(`[ERROR: /rse/protocol/update | add] ${err}`);
      res.sendStatus(500);
    });
});

router.post("/rse/setting/update", async (req, res) => {
  const payload = req.body.payload;

  await RSE.updateSettings(
    payload.certlocation,
    payload.server,
    payload.token,
    payload.rse,
    payload.params
  )
    .then(() => {
      changelog.updateChangelog(req.body.payload, "settings");
      res.sendStatus(200);
    })
    .catch((err) => {
      console.log(`[ERROR: /rse/settings/update] ${err}`);
      res.sendStatus(500);
    });
});

router.post("/rse/changelog", async (req, res) => {
  const payload = req.body.payload;

  await changelog
    .getChangelog(payload.rse_id)
    .then((results) => {
      console.log(
        results.length !== 0
          ? `[INFO] Filtered results for ${payload.rse_id}`
          : `[INFO] No Update history for ${payload.rse_id}`
      );
      res.json(results);
    })
    .catch((err) => {
      console.log(`[ERROR]: ${err}`);
      res.sendStatus(404);
    });
});

module.exports = router;
