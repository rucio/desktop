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
import { Button, makeStyles } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  editBtn: {
    margin: theme.typography.pxToRem(20),
    marginLeft: theme.typography.pxToRem(10),
  },
}));

function AccountEditButtons(props) {
  const classes = useStyles();
  switch (props.editMode) {
    case true:
      return (
        <div>
          <Button
            className={classes.editBtn}
            size="small"
            onClick={props.save}
            color="primary"
            variant="outlined"
          >
            Save
          </Button>
          <Button
            className={classes.editBtn}
            size="small"
            onClick={props.cancel}
            color="secondary"
            variant="outlined"
          >
            Cancel
          </Button>
        </div>
      );
    default:
      return (
        <div>
          <Button
            onClick={props.setEdit}
            size="small"
            color="primary"
            variant="outlined"
            className={classes.editBtn}
          >
            Edit
          </Button>
          <Button
            size="small"
            color="secondary"
            variant="outlined"
            className={classes.editBtn}
            onClick={props.confirm}
          >
            Delete Account
          </Button>
        </div>
      );
  }
}

AccountEditButtons.propTypes = {
  setEdit: PropTypes.func,
  save: PropTypes.func,
  cancel: PropTypes.func,
  confirm: PropTypes.func,
  editMode: PropTypes.bool,
};

export default AccountEditButtons;
