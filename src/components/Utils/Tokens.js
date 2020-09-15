/*
 * Copyright European Organization for Nuclear Research (CERN)
 * Licensed under the Apache License, Version 2.0 (the "License");
 * You may not use this file except in compliance with the License.
 * You may obtain a copy of the License at http://www.apache.org/licenses/LICENSE-2.0
 * 
 * Authors:
 * - Vivek Nigam, <viveknigam.nigam3@gmail.com>, 2020
 */

import { Cookies } from "react-cookie";
import { getAllServersByNames } from "./Servers";
import axios from "axios";
import { getCurrentUser } from "./User";
const cookies = new Cookies();

/**
 * Returns an Array Object with all the available tokens
 */
export function getAvailableTokens() {
  const tokens = [];
  const serverlist = getAllServersByNames();
  for (let i = 0; i < serverlist.length; i++) {
    if (cookies.get(serverlist[i]) !== undefined) {
      const tokenDict = {
        servername: serverlist[i],
        token: cookies.get(serverlist[i]),
      };
      tokens.push(tokenDict);
    }
  }

  return tokens;
}

/**
 * Performs a token refresh with current user's valid credentials through Userpass.
 */
export async function refreshToken() {
  const payload = {
    currentUser: getCurrentUser(),
    configs: JSON.parse(localStorage.getItem("Accounts")),
    authtype: localStorage.getItem("authtype")
  };

  return axios.post("/login", {
    payload,
    headers: {
      "Content-Type": "application/json",
    },
    withCredentials: true,
  });
}

export function printAvailableTokens() {
  const tokens = getAvailableTokens();
  for (let i = 0; i < tokens.length; i++) {
    console.log(tokens[i].token);
  }
}

/**
 * Purges all user tokens from the memory.
 */
export function purgeAllTokens() {
  const tokenKeys = getAllServersByNames();
  for (let i = 0; i < tokenKeys.length; i++) {
    cookies.remove(tokenKeys[i], { path: "/" });
  }
}
