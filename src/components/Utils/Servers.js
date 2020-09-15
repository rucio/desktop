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
import { getAvailableTokens } from "./Tokens";

/**
 * Returns an array of all the server-names for the servers present.
 * This is useful since the tokens are stored in cookies with the server's hostname as the key.
 */
export function getAllServersByNames() {
  const serverNames = [];
  const accounts = JSON.parse(localStorage.getItem("Accounts"));
  for (let i = 0; i < accounts.length; i++){
    const name = accounts[i].server_name;
    serverNames.push(name);
  }

  return serverNames
}

/**
 * Returns the name of the current server
 */
export function getCurrentServer() {
  const currentAccount = localStorage.getItem("CURR_ACCOUNT");
  const tokens = getAvailableTokens();
  for (let i = 0; i < tokens.length; i++){
    const account = tokens[i].token.split('-')[0]
    if (currentAccount === account){
      return tokens[i].servername
    }
  }

  return null;
}

export function serverStatus() {
  const cookies = new Cookies();
  const status = [];
  const servernames = getAllServersByNames();

  // UPDATE LOGIC! THIS DOESN'T WORK
  for (let i = 0; i < servernames.length; i++){
    if (cookies.get(servernames[i]) !== undefined)
      status.push({server: servernames[i], status: "Connected"})
    else {
      status.push({server: servernames[i], status: "Disconnected"})
    }
  }
  
  return status;
}