import React from "react";
import { makeStyles } from "@material-ui/core";
import ServerList from "./ServerList";

const useStyles = makeStyles((theme) => ({
  root: {
    minWidth: "40%",
    maxWidth: "60%",
    paddingTop: theme.typography.pxToRem(10),
    paddingBottom: theme.typography.pxToRem(10),
    fontFamily: "Inter",
  },
  title: {
    fontSize: theme.typography.pxToRem(14),
    fontWeight: 500,
    color: "#000000",
    opacity: 0.5,
  },
}));

function UserSettings() {
  const classes = useStyles();
  return (
    <div id="admin-settings" className={classes.root}>
      <div id="title" className={classes.title}>
        Servers
      </div>
      <ServerList />
    </div>
  );
}

export default UserSettings;
