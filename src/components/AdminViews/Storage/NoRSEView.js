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
import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  noSelected: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    fontFamily: "Inter",
    height: "100%",
    width: "100%"
  },
  h1: {
    fontSize: "1.2rem",
    fontWeight: 700,
    color: "#000000",
    opacity: 0.6,
  },
  h2: {
    fontSize: "1.3rem",
    fontWeight: 500,
    color: "#000000",
    opacity: 0.5,
    padding: theme.typography.pxToRem(10),
  },
}));

function NoRSEView() {
  const classes = useStyles();
  return (
    <div className={classes.noSelected}>
      <div className={classes.h1}>No RSE Selected</div>
      <div className={classes.h2}>Select an RSE for info.</div>
    </div>
  );
}

export default NoRSEView;
