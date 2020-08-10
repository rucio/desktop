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
