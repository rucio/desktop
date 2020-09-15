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
import EditIcon from "@material-ui/icons/Edit";
import PropTypes from "prop-types";
import { IconButton, makeStyles } from "@material-ui/core";
import DoneIcon from "@material-ui/icons/Done";
import CloseIcon from "@material-ui/icons/Close";
import AddIcon from '@material-ui/icons/Add';

function EditButtons(props) {
  const classes = useStyles();

  switch (props.editMode) {
    case true:
      return (
        <div>
          <IconButton className={classes.iconBtn} onClick={props.confirmEdit}>
            <DoneIcon fontSize="inherit" color="primary" />
          </IconButton>
          <IconButton className={classes.iconBtn} onClick={props.newOption}>
            <AddIcon fontSize="inherit" color="primary" />
          </IconButton>
          <IconButton className={classes.iconBtn} onClick={props.cancelEdit}>
            <CloseIcon fontSize="inherit" color="secondary" />
          </IconButton>
        </div>
      );
    default:
      return (
        <div>
          <IconButton className={classes.iconBtn} onClick={props.onClick}>
            <EditIcon color="action" fontSize="inherit" />
          </IconButton>
        </div>
      );
  }
}

const useStyles = makeStyles({
  iconBtn: {
    fontSize: "inherit",
    right: 0,
  },
});

EditButtons.propTypes = {
  editMode: PropTypes.bool,
  onClick: PropTypes.func,
  cancelEdit: PropTypes.func,
  confirmEdit: PropTypes.func,
  newOption: PropTypes.func
};

export default EditButtons;
