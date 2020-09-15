/*
 * Copyright European Organization for Nuclear Research (CERN)
 * Licensed under the Apache License, Version 2.0 (the "License");
 * You may not use this file except in compliance with the License.
 * You may obtain a copy of the License at http://www.apache.org/licenses/LICENSE-2.0
 * 
 * Authors:
 * - Vivek Nigam, <viveknigam.nigam3@gmail.com>, 2020
 */

import React, { useState } from "react";
import PropTypes from "prop-types";
import { TextField, makeStyles, IconButton } from "@material-ui/core";
import DeleteIcon from "@material-ui/icons/Delete";
import DialogDelete from "./DialogDelete";

const useStyles = makeStyles((theme) => ({
  root: {
    "& .MuiTextField-root": {
      margin: theme.spacing(1),
      width: "25ch",
    },
    display: "flex",
  },
}));

function ServerConfigEditForm(props) {
  const classes = useStyles();
  const [open, setOpen] = useState(false);

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <form className={classes.root}>
      <TextField
        id="option"
        size="small"
        disabled
        defaultValue={props.option}
      />
      <TextField
        size="small"
        id="option-value"
        name={props.option}
        defaultValue={props.optionValue}
        onChange={props.handleChange}
      />
      <IconButton onClick={() => setOpen(true)}>
        <DeleteIcon fontSize="small" color="secondary" />
      </IconButton>
      <DialogDelete
        open={open}
        option={props.option}
        section={props.section}
        server={props.server}
        handleClose={handleClose}
        handleDelete={props.handleDelete}
      />
    </form>
  );
}

ServerConfigEditForm.propTypes = {
  option: PropTypes.string,
  optionValue: PropTypes.any,
  onClick: PropTypes.func,
  server: PropTypes.string,
  section: PropTypes.string,
  handleDelete: PropTypes.func,
  handleChange: PropTypes.func
};

export default ServerConfigEditForm;
