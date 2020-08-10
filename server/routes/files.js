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
