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
