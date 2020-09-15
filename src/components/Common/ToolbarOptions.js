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
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import SettingsIcon from "@material-ui/icons/Settings";
import NotificationsIcon from "@material-ui/icons/Notifications";
import { IconButton, makeStyles } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  optionIcon: {
    color: "#3e55ab",
  },
  icon: {
    fontSize: theme.typography.pxToRem(32)
  }
}));

function ToolbarOptions() {
  const classes = useStyles();

  return (
    <div id="options">
      <IconButton className={classes.optionIcon} href="#app/settings">
        <SettingsIcon className={classes.icon} />
      </IconButton>
      <IconButton className={classes.optionIcon}>
        <NotificationsIcon className={classes.icon} />
      </IconButton>
      <IconButton className={classes.optionIcon} href="#app/account">
        <AccountCircleIcon className={classes.icon} />
      </IconButton>
    </div>
  );
}

export default ToolbarOptions;
