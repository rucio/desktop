const express = require("express");
const RSE = require("../APIs/rse");
const router = express.Router();

router.post("/rses", async (req, res) => {
  const payload = req.body.payload;

  await RSE.getRSEs(payload.certlocation, payload.server, payload.token)
    .then((rseList) =>
      res.send(RSE.processResponseData(rseList.data))
    )
    .catch((err) => {
      console.log(`[ERROR: /rses] ${err}`);
      res.sendStatus(err.status);
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
      res.sendStatus(401);
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

module.exports = router;
