import React from "react";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import SettingsIcon from "@material-ui/icons/Settings";
import NotificationsIcon from "@material-ui/icons/Notifications";
import { IconButton, makeStyles } from "@material-ui/core";

const useStyles = makeStyles({
  optionIcon: {
    color: "#3e55ab",
  },
});

function ToolbarOptions() {
  const classes = useStyles();

  return (
    <div id="options">
      <IconButton className={classes.optionIcon} href="#app/settings">
        <SettingsIcon />
      </IconButton>
      <IconButton className={classes.optionIcon}>
        <NotificationsIcon />
      </IconButton>
      <IconButton className={classes.optionIcon} href="#app/account">
        <AccountCircleIcon />
      </IconButton>
    </div>
  );
}

export default ToolbarOptions;
