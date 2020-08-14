import React from "react";
import { makeStyles } from "@material-ui/core";
import AdminStorage from "../AdminViews/Storage/AdminStorage";
import UserStorage from "../UserViews/Storage/UserStorage";
import { grey } from "@material-ui/core/colors";

const useStyles = makeStyles({
  root: {
    width: "calc(100% - 48px)",
    textAlign: "left",
    fontFamily: "Cern",
    overflow: "auto"
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
    paddingTop: 20,
  },
  info: {
    fontSize: 14,
    color: "#000000",
    opacity: 0.8,
    paddingRight: 10,
    paddingTop: 10,
  },
});

function Storage() {
  const classes = useStyles();
  const view = localStorage.getItem("viewContext");
  return (
    <div className={classes.root}>
      {view === "admin" ? <AdminStorage /> : <UserStorage />}
    </div>
  );
}

export default Storage;
