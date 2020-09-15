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
import { TextField, makeStyles } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  root: {
    "& .MuiTextField-root": {
      margin: theme.spacing(1),
      width: "30ch",
      height: "1ch",
    },
    display: "flex",
  },
}));

function AccountDetailsForm(props) {
  const classes = useStyles();

  return (
    <form className={classes.root}>
      <TextField
        id="option"
        size="small"
        disabled
        defaultValue={props.keyValue}
      />
      <TextField
        size="small"
        id={props.keyValue}
        defaultValue={props.value}
        onChange={(e) => props.onChange(e)}
      />
    </form>
  );
}

AccountDetailsForm.propTypes = {
  keyValue: PropTypes.string,
  value: PropTypes.any,
  onChange: PropTypes.func,
};

export default AccountDetailsForm;
