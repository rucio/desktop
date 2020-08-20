import React from "react";
import PropTypes from "prop-types";
import { CircularProgress, makeStyles } from "@material-ui/core";

const useStyles = makeStyles({
  root: {
    padding: 10,
    margin: 5,
    fontFamily: "Inter",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center"
  },
  spinner: {
    margin: 20,
    color: "#3e55ab",
  },
  message: {
    fontSize: 14,
    fontWeight: 500,
    color: "#000000",
    opacity: 0.8
  },
});

function LoadingSpinner(props) {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <CircularProgress className={classes.spinner} />
      <div className={classes.message}>{props.message}</div>
    </div>
  );
}

LoadingSpinner.propTypes = {
  message: PropTypes.string,
};

export default LoadingSpinner;
