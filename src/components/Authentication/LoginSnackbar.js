/*
 * Copyright European Organization for Nuclear Research (CERN)
 * Licensed under the Apache License, Version 2.0 (the "License");
 * You may not use this file except in compliance with the License.
 * You may obtain a copy of the License at http://www.apache.org/licenses/LICENSE-2.0
 * 
 * Authors:
 * - Vivek Nigam, <viveknigam.nigam3@gmail.com>, 2020
 */

import React from "react";
import AlertSnackbar from "../Utils/Snackbar";
import { useDispatch, useSelector } from "react-redux";

function LoginSnackbar() {
  const dispatch = useDispatch();
  const storeState = useSelector((state) => state);

  switch (storeState.status) {
    case 200:
      return (
        <AlertSnackbar
          severity="success"
          message="Signed in to Rucio"
          onExited={() => dispatch({ type: "LOG_IN" })}
        />
      );
    case 401:
      return <AlertSnackbar severity="error" message="Invalid Credentials" />;
    case 500:
      return <AlertSnackbar severity="error" message="Connection Error" />;
    default:
      return null;
  }
}

export default LoginSnackbar;
