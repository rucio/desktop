/*
 * Copyright European Organization for Nuclear Research (CERN)
 * Licensed under the Apache License, Version 2.0 (the "License");
 * You may not use this file except in compliance with the License.
 * You may obtain a copy of the License at http://www.apache.org/licenses/LICENSE-2.0
 * 
 * Authors:
 * - Vivek Nigam, <viveknigam.nigam3@gmail.com>, 2020
 */

const initialState = null

function statusReducer(state = initialState, action) {
  switch (action.type) {
    case "SUCCESS":
      return 200;
    case "UNAUTHORIZED":
      return 401;
    case "SERVER_ERR":
      return 500;
    default:
      return state;
  }
}

export default statusReducer;
