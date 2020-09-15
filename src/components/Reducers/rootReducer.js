/*
 * Copyright European Organization for Nuclear Research (CERN)
 * Licensed under the Apache License, Version 2.0 (the "License");
 * You may not use this file except in compliance with the License.
 * You may obtain a copy of the License at http://www.apache.org/licenses/LICENSE-2.0
 * 
 * Authors:
 * - Vivek Nigam, <viveknigam.nigam3@gmail.com>, 2020
 */

import { combineReducers } from "redux";
import directoryReducer from "./directoryReducer";
import metadataReducer from "./metadataReducer";
import loginReducer from "./loginReducer";
import statusReducer from "./statusReducer";
import { snackbarReducer } from "./snackbarReducer";
import { loadingReducer } from "./loadingReducer";
import { fetchReducer } from "./fetchReducer";

const rootReducer = combineReducers({
  directory: directoryReducer,
  metadata: metadataReducer,
  login: loginReducer,
  status: statusReducer,
  snackbar: snackbarReducer,
  loading: loadingReducer,
  fetch: fetchReducer
});

export default rootReducer;
