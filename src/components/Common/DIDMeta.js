import React from "react";
import PropTypes from "prop-types";
import { Paper, makeStyles } from "@material-ui/core";
import MetaIcons from "./DIDMetaIcons";
import { grey } from "@material-ui/core/colors";
import DIDMetaDetails from "./DIDMetaDetails";
import { useSelector } from "react-redux";
import LoadingSpinner from "../Utils/LoadingSpinner";

const useStyles = makeStyles({
  rootTitle: {
    width: "100%",
    textAlign: "left",
    padding: 12,
    fontFamily: "Cern",
    fontWeight: 500,
    color: grey[600],
  },
  root: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "flex-start",
    alignItems: "center",
    margin: 12,
    padding: 12,
    float: "right",
    minWidth: "20%",
    maxHeight: "80%",
  },
  title: {
    width: "100%",
    fontFamily: "Cern",
    fontWeight: 500,
    fontSize: 24,
    padding: 5,
    marginLeft: 18,
    color: grey[800],
    textAlign: "left",
  },
});

function DIDMeta(props) {
  const classes = useStyles();
  const loading = useSelector((state) => state.loading);

  return (
    <Paper variant="outlined" className={classes.root}>
      <div className={classes.rootTitle}>Details</div>
      {loading ? (
        <LoadingSpinner message="Loading" />
      ) : (
        <React.Fragment>
          <MetaIcons icon={props.icon} />
          <div id="did-name" className={classes.title}>
            {props.did}
          </div>
          <DIDMetaDetails meta={props.meta} />
        </React.Fragment>
      )}
    </Paper>
  );
}

DIDMeta.propTypes = {
  icon: PropTypes.string,
  did: PropTypes.string,
  meta: PropTypes.object
}

export default DIDMeta;
