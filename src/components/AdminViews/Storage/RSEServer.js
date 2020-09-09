import React from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    width: "50%",
  },
  text: {
    fontFamily: "Inter",
    fontSize: theme.typography.pxToRem(18),
    fontWeight: 500,
    color: "#000000",
    opacity: 0.6,
    paddingTop: theme.typography.pxToRem(20),
    paddingBottom: theme.typography.pxToRem(30),
  },
}));

function RSEServer(props) {
  const classes = useStyles();
  
  return (
    <div className={classes.root}>
      <div className={classes.text}>Showing RSEs for: {props.account} at {props.server}</div>
    </div>
  );
}

RSEServer.propTypes = {
  server: PropTypes.string,
  account: PropTypes.string,
  handleChange: PropTypes.func,
};

export default RSEServer;
