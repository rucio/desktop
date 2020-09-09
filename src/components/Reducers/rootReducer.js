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
