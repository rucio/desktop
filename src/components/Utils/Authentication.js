/*
 * Copyright European Organization for Nuclear Research (CERN)
 * Licensed under the Apache License, Version 2.0 (the "License");
 * You may not use this file except in compliance with the License.
 * You may obtain a copy of the License at http://www.apache.org/licenses/LICENSE-2.0
 * 
 * Authors:
 * - Vivek Nigam, <viveknigam.nigam3@gmail.com>, 2020
 */

import axios from "axios";

/**
 * Attempts login with `authtype` Strategy from Rucio-Server
 * @param {String} authtype "userpass" or "x509"
 * @param {String} account Valid Rucio Account
 * @param {String} username Account identity: Username
 * @param {String} password Account identity: Password
 * @param {String} clientcert 
 */
export function login(
  authtype,
  account,
  username,
  password,
) {
  const payload = {
    currentUser:
      authtype === "userpass"
        ? { account: account, username: username, password: password }
        : { account: account },
    configs: JSON.parse(localStorage.getItem("Accounts")),
    authtype: authtype
  };

  return axios.post("/login", {
    payload,
    headers: {
      "Content-Type": "application/json",
    },
    withCredentials: true,
  });
}
