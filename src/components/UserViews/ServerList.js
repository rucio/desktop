import React from "react";
import { makeStyles } from "@material-ui/core";
import { green, red } from "@material-ui/core/colors";
import { serverStatus } from "../Utils/Servers";

const useStyles = makeStyles((theme) => ({
  root: {
    fontFamily: "Cern",
    paddingTop: 10,
    paddingBottom: 10,
    fontSize: 20,
    width: "50%",
  },
  title: {
    fontSize: 14,
    fontWeight: 500,
    color: "#000000",
    opacity: 0.5,
  },
  listItem: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    color: "#000000",
    opacity: 0.8,
    fontSize: theme.typography.pxToRem(16),
    flexBasis: "33.33%",
    flexShrink: 0,
    paddingTop: 5,
    paddingBottom: 5,
  },
  statusC: {
    fontSize: theme.typography.pxToRem(16),
    color: green[600],
    fontWeight: 500,
    opacity: 1,
  },
  statusD: {
    fontSize: theme.typography.pxToRem(16),
    color: red[600],
    fontWeight: 500,
    opacity: 1,
  },
}));

function ServerList(props) {
  const classes = useStyles();
  const serverDetails = serverStatus();
  return (
    <div id="server-list" className={classes.root}>
      {serverDetails.map((item) => (
        <div key={item.server} className={classes.listItem}>
          <div>{item.server}</div>
          <div
            className={
              item.status === "Connected" ? classes.statusC : classes.statusD
            }
          >
            {item.status}
          </div>
        </div>
      ))}
    </div>
  );
}

export default ServerList;
