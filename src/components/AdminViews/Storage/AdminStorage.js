import React from "react";
import { makeStyles } from "@material-ui/core";

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
    paddingTop: 20,
  },
  hint: {
    fontSize: 14,
    fontWeight: 500,
    color: "#000000",
    opacity: 0.4,
    paddingTop: 10,
    paddingBottom: 10,
  },
});

function AdminStorage(props) {
  const classes = useStyles();
  return (
    <div id="admin-storage-root" className={classes.root}>
      <div id="title" className={classes.title}>
        Rucio Storage Elements
      </div>
    </div>
  );
}

export default AdminStorage;
