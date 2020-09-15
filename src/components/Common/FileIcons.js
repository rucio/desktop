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
import FolderIcon from "@material-ui/icons/Folder";
import DescriptionIcon from "@material-ui/icons/Description";
import { makeStyles } from "@material-ui/core";
import { lightBlue } from "@material-ui/core/colors";

const useStyles = makeStyles(theme => ({
  root: {
    fontSize: theme.typography.pxToRem(32),
    color: lightBlue[400],
    padding: theme.typography.pxToRem(5)
  },
}));

function FileIcons(props) {
  const classes = useStyles();
  if(props.rowValue === "FILE" || props.rowValue === "FOLDER" || props.rowValue === undefined) return null;

  switch (props.type) {
    case "FILE":
      return <DescriptionIcon className={classes.root} />;
    case "FOLDER":
      return <FolderIcon className={classes.root} />;
    default:
      return null
  }
}

export default FileIcons;
