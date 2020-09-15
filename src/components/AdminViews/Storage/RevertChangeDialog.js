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
import PropTypes from "prop-types";
import {
  makeStyles,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
} from "@material-ui/core";
import { useSelector } from "react-redux";
import LoadingSpinner from "../../Utils/LoadingSpinner";
import { red, green } from "@material-ui/core/colors";

const useStyles = makeStyles((theme) => ({
  root: {},
  title: {
    fontFamily: "Inter",
    margin: "0.6rem",
  },
  message: {
    fontSize: theme.typography.pxToRem(16),
    fontWeight: 400,
    opacity: 0.8,
    paddingTop: 0,
    padding: "0.6rem",
    lineHeight: 1.5,
  },
  message1: {
    fontSize: theme.typography.pxToRem(16),
    fontWeight: 500,
    opacity: 0.8,
    paddingTop: "0.6rem",
    paddingBottom: "0.2rem",
    lineHeight: 1.5,
  },
  changelog: {
    color: "#000000",
    opacity: 0.8,
    padding: "0.6rem",
    maxHeight: "24rem",
    overflow: "auto",
  },
  existing: {
    backgroundColor: red[50],
    padding: "0.4rem",
    fontFamily: "Inter",
  },
  incoming: {
    backgroundColor: green[50],
    padding: "0.4rem",
    fontFamily: "Inter",
  },
}));

function RevertChangeDialog(props) {
  const classes = useStyles();
  const [changelog, setChangelog] = React.useState(props.changelog);
  const loading = useSelector((state) => state.loading);

  const value2str = (value) => {
    return typeof value === "boolean" ? value.toString() : value;
  };

  const processInnerObject = (obj) => {
    return Object.keys(obj).map((item) =>
      JSON.stringify({ [item]: obj[item] })
    );
  };

  React.useEffect(() => {
    if (props.changelog.component === "protocol") {
      setChangelog({
        ...props.changelog,
        initial: {
          ...props.changelog.initial,
          extended_attributes:
          props.changelog.initial.extended_attributes !== null
            ? processInnerObject(props.changelog.initial.extended_attributes)
            : "null",
          domains: processInnerObject(props.changelog.initial.domains),
        },
        changed: {
          ...props.changelog.changed,
          extended_attributes:
            props.changelog.changed.extended_attributes !== null
              ? processInnerObject(props.changelog.changed.extended_attributes)
              : "null",
          domains: processInnerObject(props.changelog.changed.domains),
        },
      });
    }
  }, [props.changelog]);

  return (
    <Dialog open={props.open} onClose={props.handleClose} key={props.key}>
      <DialogTitle className={classes.title} id="confirm-title">
        {"Rollback Changes"}
      </DialogTitle>
      <DialogContent>
        {loading ? (
          <LoadingSpinner
            message={`Rolling Back RSE Parameters. Please Wait`}
          />
        ) : (
          <div id="changes-content" className={classes.root}>
            <p id="message" className={classes.message}>
              The following changes were made in {changelog.component}. Review
              the changes before rolling back to this version. Rolling back will
              alter the {changelog.component}
            </p>
            <div id="changelog" className={classes.changelog}>
              <div className={classes.message1}>From:</div>
              {Object.keys(changelog.changed).map((key) => (
                <div key={key} id="existing" className={classes.existing}>
                  {" "}
                  - {key} : {value2str(changelog.changed[key])}
                </div>
              ))}
              <div className={classes.message1}>To:</div>
              {Object.keys(changelog.initial).map((key) => (
                <div key={key} id="existing" className={classes.incoming}>
                  {" "}
                  + {key} : {value2str(changelog.initial[key])}
                </div>
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
          Rollback
        </Button>
      </DialogActions>
    </Dialog>
  );
}

RevertChangeDialog.propTypes = {
  key: PropTypes.any,
  open: PropTypes.bool,
  handleClose: PropTypes.func,
  handleConfirm: PropTypes.func,
  changelog: PropTypes.object,
  currentIndex: PropTypes.number,
};

export default RevertChangeDialog;
