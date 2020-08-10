const express = require("express");
const config = require("../APIs/config");
const router = express.Router();

router.post("/config", async (req, res) => {
  const payload = req.body.payload;

  await config
    .getAllConfig(payload.certlocation, payload.server, payload.token)
    .then((config) => {
      res.send(config.data);
    })
    .catch((err) => {
      console.log(`[ERROR: /getconfig] ` + err);
      res.sendStatus(401);
    });
});

router.post("/addconfig", async (req, res) => {
  const payload = req.body.payload;

  await config
    .addConfig(
      payload.certlocation,
      payload.server,
      payload.token,
      payload.values
    )
    .then(() => res.sendStatus(200))
    .catch((response) => {
      response.status === 401 ? res.sendStatus(401) : res.sendStatus(500);
    });
});

router.post("/delconfig", async (req, res) => {
  const payload = req.body.payload;

  await config
    .delConfig(
      payload.certlocation,
      payload.server,
      payload.token,
      payload.values
    )
    .then(() => res.sendStatus(200))
    .catch((err) => {
      console.log(`[ERROR: /delconfig] ${err}`);
      res.sendStatus(401);
    });
});

module.exports = router;
