import React from "react";
import PropTypes from "prop-types";
import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert from "@material-ui/lab/Alert";
import { useSelector, useDispatch } from "react-redux";

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} action={null} />;
}

/**
 * React Component to Display Alert Messages depending on severity.
 *
 * @param {*} props From Parent Component
 * @property {String} severity can be selected from {"success", "error", "info", "warning"}
 * @property {String} message Message to be displayed
 * @property {func} onExited Function to perform when the snackbar has exited
 */
export default function AlertSnackbar(props) {
  const storeState = useSelector((state) => state);
  const dispatch = useDispatch();

  const handleClose = () => {
    dispatch({ type: "HIDE_SNACKBAR" });
  };

  return (
    <React.Fragment>
      <Snackbar
        open={storeState.snackbar}
        autoHideDuration={2000}
        onClose={handleClose}
        onExited={props.onExited}
      >
        <Alert onClose={handleClose} severity={props.severity}>
          {props.message}
        </Alert>
      </Snackbar>
    </React.Fragment>
  );
}

AlertSnackbar.propTypes = {
  severity: PropTypes.string,
  message: PropTypes.string,
  onExited: PropTypes.func,
};
