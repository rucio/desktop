const express = require("express");
const RSE = require("../APIs/rse");
const router = express.Router();

router.post("/rses", async (req, res) => {
  const payload = req.body.payload;

  await RSE.getRSEs(payload.certlocation, payload.server, payload.token)
    .then((rseList) => res.send(rseList.data))
    .catch((err) => {
      console.log(`[ERROR: /rses] ${err}`);
      res.sendStatus(err.status);
    });
});

module.exports = router;