import React from "react";
import AdminSettings from "../AdminViews/AdminSettings";
import UserSettings from "../UserViews/UserSettings";
import { makeStyles } from "@material-ui/core";
import { grey } from "@material-ui/core/colors";

const useStyles = makeStyles({
  root: {
    width: "inherit",
    textAlign: "left",
    fontFamily: "Cern",
    overflow: "auto"
  },
  title: {
    fontSize: 32,
    fontWeight: 500,
    color: grey[800],
    paddingTop: 20,
    paddingBottom: 20,
  },
  hint: {
    fontSize: 14,
    fontWeight: 500,
    color: "#000000",
    opacity: 0.5,
  },
  info: {
    fontSize: 18,
    color: "#000000",
    opacity: 0.8,
    paddingRight: 10
  }
});
function Settings() {
  const classes = useStyles();
  const view = localStorage.getItem("viewContext");
  const account = localStorage.getItem("CURR_ACCOUNT");

  return (
    <div id="settings-root" className={classes.root}>
      <div id="account-name" className={classes.title}>
        <div className={classes.hint}>account</div>
        <div style={{ paddingTop: 5, paddingBottom: 10 }}>{account}</div>
      </div>
      {view === "admin" ? <AdminSettings /> : <UserSettings />}
    </div>
  );
}

export default Settings;
