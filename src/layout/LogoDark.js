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
import darkLogoImage from "./ruciosq_dark.png";
import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles(theme => ({
  logo: {
    position: "relative",
    padding: theme.typography.pxToRem(5),
    height: theme.typography.pxToRem(50),
    width: "auto",
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-start",
  },
}));

function LogoDark(props) {
  const classes = useStyles();
  return (
    <img
      src={darkLogoImage}
      alt="logo_dark"
      className={props.className || classes.logo}
    />
  );
}

export default LogoDark;
