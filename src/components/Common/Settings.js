/* eslint-disable react/no-unescaped-entities */
import React from "react";
import AdminSettings from "../AdminViews/AdminSettings";
import UserSettings from "../UserViews/UserSettings";
import { makeStyles } from "@material-ui/core";
import { grey } from "@material-ui/core/colors";
import packageJSON from "../../../package.json";

const useStyles = makeStyles({
  root: {
    width: "inherit",
    textAlign: "left",
    fontFamily: "Cern",
    overflow: "auto",
  },
  title: {
    fontSize: 32,
    fontWeight: 500,
    color: grey[800],
    paddingTop: 20,
  },
  hint: {
    fontSize: 16,
    fontWeight: 500,
    color: "#000000",
    opacity: 0.5,
    paddingTop: 20
  },
  info: {
    fontSize: 14,
    color: "#000000",
    opacity: 0.8,
    paddingRight: 10,
    paddingTop: 10,
  },
});
function Settings() {
  const classes = useStyles();
  const view = localStorage.getItem("viewContext");
  const account = localStorage.getItem("CURR_ACCOUNT");

  return (
    <div id="settings-root" className={classes.root}>
      <div id="account-name" className={classes.title}>
        <div className={classes.hint}>Account</div>
        <div style={{ paddingTop: 5, paddingBottom: 10 }}>{account}</div>
      </div>
      {view === "admin" ? <AdminSettings /> : <UserSettings />}
      <div className={classes.hint}>
        Version
        <div className={classes.info}>
          You're currently using Rucio Desktop v{packageJSON.version}
        </div>
      </div>
    </div>
  );
}

export default Settings;
