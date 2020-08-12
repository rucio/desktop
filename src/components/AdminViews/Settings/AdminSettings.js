import React from "react";
import { makeStyles } from "@material-ui/core";
import ServerList from "./ServerList";

const useStyles = makeStyles({
  root: {
    minWidth: "40%",
    maxWidth: "60%",
    paddingTop: 10,
    paddingBottom: 10,
    fontFamily: "Cern",
  },
  title: {
    fontSize: 16,
    fontWeight: 500,
    color: "#000000",
    opacity: 0.6,
    paddingTop: 20
  },
  hint: {
    fontSize: 14,
    fontWeight: 500,
    color: "#000000",
    opacity: 0.4,
    paddingTop: 10,
    paddingBottom: 10
  }
});

function AdminSettings() {
  const classes = useStyles();
  return (
    <div id="admin-settings" className={classes.root}>
      <div id="title" className={classes.title}>
        Servers
      </div>
      <div className={classes.hint}>Manage your server configurations</div>
      <ServerList />
    </div>
  );
}

export default AdminSettings;
