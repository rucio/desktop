/*
 * Copyright European Organization for Nuclear Research (CERN)
 * Licensed under the Apache License, Version 2.0 (the "License");
 * You may not use this file except in compliance with the License.
 * You may obtain a copy of the License at http://www.apache.org/licenses/LICENSE-2.0
 * 
 * Authors:
 * - Vivek Nigam, <viveknigam.nigam3@gmail.com>, 2020
 */

import { readableBytes } from "../Utils/Metadata";

const fileMeta = {};

function metadataReducer(state = fileMeta, action) {
  switch (action.type) {
    case "GET_META":
      return {
        account: action.payload.account,
        name: action.payload.name,
        bytes: readableBytes(action.payload.bytes),
        scope: action.payload.scope,
        length: action.payload.length,
        type: action.payload.type,
      };
    case "CLEAR_META":
      return {};
    default:
      return state;
  }
}

export default metadataReducer;
