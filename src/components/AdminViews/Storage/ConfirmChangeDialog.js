import React from "react";
import PropTypes from "prop-types";
import { useSelector } from "react-redux";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  makeStyles,
  DialogActions,
  Button,
} from "@material-ui/core";
import LoadingSpinner from "../../Utils/LoadingSpinner";
import { green, red } from "@material-ui/core/colors";

const useStyles = makeStyles({
  root: {
    fontFamily: "Inter",
  },
  title: {
    fontFamily: "Inter",
    margin: "0.6rem",
  },
  message: {
    fontSize: "1rem",
    fontWeight: 500,
    opacity: 0.8,
    paddingTop: 0,
    padding: "0.6rem",
    lineHeight: 1.5,
  },
  changelog: {
    color: "#000000",
    opacity: 0.8,
    padding: "0.6rem",
    maxHeight: "16rem",
    overflow: "auto",
  },
  existing: {
    backgroundColor: red[50],
    padding: "0.4rem",
  },
  incoming: {
    backgroundColor: green[50],
    padding: "0.4rem",
    marginBottom: "0.8rem",
  },
});

function ConfirmChangeDialog(props) {
  const classes = useStyles();
  const changes = props.changes;
  const loading = useSelector((state) => state.loading);

  const value2str = (value) => {
    return typeof value === "boolean" ? value.toString() : value;
  }

  return (
    <Dialog open={props.open} onClose={props.handleClose}>
      <DialogTitle className={classes.title} id="confirm-title">
        {"Review Changes"}
      </DialogTitle>
      <DialogContent>
        {loading ? (
          <LoadingSpinner message={`Updating RSE Parameters. Please Wait`} />
        ) : (
          <div id="changes-content" className={classes.root}>
            <p id="message" className={classes.message}>
              The following changes were made and the new settings will be
              applied. Review your changes before confirming.
            </p>
            <div id="changelog" className={classes.changelog}>
              {Object.keys(changes).map((key) => (
                <React.Fragment key={key}>
                  <div id="existing" className={classes.existing}>
                    {" "}
                    - {key}:{" "}
                    {typeof props.initialValues === "object"
                      ? value2str(props.initialValues[key])
                      : props.initialValues[props.currentIndex][key]}
                  </div>
                  <div id="incoming" className={classes.incoming}>
                    {" "}
                    + {key}: {value2str(changes[key])}
                  </div>
                </React.Fragment>
              ))}
            </div>
          </div>
        )}
      </DialogContent>
      <DialogActions>
        <Button
          color="secondary"
          variant="outlined"
          onClick={props.handleClose}
        >
          Cancel
        </Button>
        <Button color="primary" onClick={props.handleConfirm}>
          Confirm Changes
        </Button>
      </DialogActions>
    </Dialog>
  );
}

ConfirmChangeDialog.propTypes = {
  open: PropTypes.bool,
  handleClose: PropTypes.func,
  handleConfirm: PropTypes.func,
  changes: PropTypes.object,
  initialValues: PropTypes.any,
  currentIndex: PropTypes.number,
};

export default ConfirmChangeDialog;
