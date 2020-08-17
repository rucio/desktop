import React from "react";
import PropTypes from "prop-types";
import { Card, makeStyles } from "@material-ui/core";
import NoRSEView from "./NoRSEView";

const useStyles = makeStyles((theme) => ({
  root: {
    borderRadius: 16.18,
    height: "81vh",
    margin: 10,
    position: "static",
    right: 20,
    display: "flex",
    flex: "1 1 60%",
    [theme.breakpoints.down("md")]: {
      display: "none",
    },
    [theme.breakpoints.down("lg")]: {
      height: "75vh",
      flex: "1 1 58%",
    },
    [theme.breakpoints.up("lg")]: {
      width: "40%",
    },
    [theme.breakpoints.down("xl")]: {
      width: "45%",
    },
    [theme.breakpoints.up("xl")]: {
      width: "50%",
    },
  },
  content: {
    height: "100%",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    fontFamily: "Cern",
    padding: 20,
    flex: "1 0 60%"
  },
}));

function RSEInfo(props) {
  const classes = useStyles();
  return (
    <Card className={classes.root}>
      <div className={classes.content}>
        {props.details.rse ? <div>{props.details.rse}</div> : <NoRSEView />}
      </div>
    </Card>
  );
}

RSEInfo.propTypes = {
  details: PropTypes.object,
};

export default RSEInfo;
