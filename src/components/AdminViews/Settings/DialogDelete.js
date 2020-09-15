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
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import { useSelector } from "react-redux";
import LoadingSpinner from "../../Utils/LoadingSpinner";

function DialogDelete(props) {
  const loading = useSelector((state) => state.loading);
  return (
    <div>
      <Dialog
        open={props.open}
        onClose={props.handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"Confirm Option Delete?"}
        </DialogTitle>
        <DialogContent>
          {loading ? (
            <LoadingSpinner message={`Deleting Option ${props.option}`} />
          ) : (
            <DialogContentText id="alert-dialog-description">
              Are you sure you want to delete {props.section}.{props.option} on{" "}
              {props.server} ?
            </DialogContentText>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={props.handleClose} color="secondary">
            Cancel
          </Button>
          <Button onClick={props.handleDelete} color="primary" autoFocus>
            Yes
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

DialogDelete.propTypes = {
  open: PropTypes.bool,
  option: PropTypes.string,
  section: PropTypes.string,
  server: PropTypes.string,
  handleClose: PropTypes.func,
  handleDelete: PropTypes.func,
};

export default DialogDelete;
