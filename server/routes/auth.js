const express = require("express");
const authStrategy = require("../APIs/authStrategy");
const utils = require("../utils/accounts");
const router = express.Router();

router.post("/login", async (req, res) => {
  const credentials = req.body.payload.configs;
  const currentUser = req.body.payload.currentUser;
  const authtype = req.body.payload.authtype;
  
  if (!utils.validateAccount(currentUser, credentials, authtype)) {
    res.sendStatus(401);
    console.log(`[INFO /login] Invalid Credentials for: ${currentUser.account}`);
    return;
  }

  const attemptStatus = [];
  let authStatus;

  for (let i = 0; i < credentials.length; i++) {
    try {
      if (credentials[i].auth_type === "userpass")
        authStatus = await authStrategy.getTokenWithUserpass(
          req,
          res,
          credentials[i]
        );
      if (credentials[i].auth_type === "x509")
        authStatus = await authStrategy.getTokenWithX509(
          req,
          res,
          credentials[i]
        );
      if (authStatus) {
        attemptStatus.push({
          account: credentials[i].account,
          server: credentials[i].server_name,
          status: 200,
        });
        console.log(`[INFO] Token received for ${credentials[i].server_name}`);
      } else {
        attemptStatus.push({
          account: credentials[i].account,
          server: credentials[i].server_name,
          status: 401,
        });
        console.log(
          `[INFO] Failed to get token from ${credentials[i].server_name}`
        );
      }
    } catch (e) {
      console.log(e);
    }
  }

  if (attemptStatus.length !== credentials.length) {
    res.sendStatus(500);
    return;
  }

  if (utils.currentUserAuthenticated(currentUser, attemptStatus)) {
    res.send(attemptStatus).status(200);
  } else {
    res.sendStatus(401);
  }
});

module.exports = router;
