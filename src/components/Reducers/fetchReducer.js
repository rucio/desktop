/*
 * Copyright European Organization for Nuclear Research (CERN)
 * Licensed under the Apache License, Version 2.0 (the "License");
 * You may not use this file except in compliance with the License.
 * You may obtain a copy of the License at http://www.apache.org/licenses/LICENSE-2.0
 * 
 * Authors:
 * - Vivek Nigam, <viveknigam.nigam3@gmail.com>, 2020
 */

const initialState = false;

export function fetchReducer(state = initialState, action) {
  switch (action.type) {
    case "TRIGGER_FETCH":
      return 1;
    case "CANCEL_FETCH":
      return 0;
    default:
      return 0;
  }
}
