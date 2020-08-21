import React from "react";
import PropTypes from "prop-types";
import { Paper, makeStyles } from "@material-ui/core";
import MetaIcons from "./DIDMetaIcons";
import { grey } from "@material-ui/core/colors";
import DIDMetaDetails from "./DIDMetaDetails";
import { useSelector } from "react-redux";
import LoadingSpinner from "../Utils/LoadingSpinner";

const useStyles = makeStyles((theme) => ({
  rootTitle: {
    width: "100%",
    textAlign: "left",
    padding: theme.typography.pxToRem(12),
    fontFamily: "Inter",
    fontWeight: 500,
    color: grey[600],
  },
  root: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "flex-start",
    alignItems: "center",
    margin: theme.typography.pxToRem(12),
    padding: theme.typography.pxToRem(12),
    float: "right",
    minWidth: "20%",
    maxHeight: "80%",
  },
  title: {
    width: "100%",
    fontFamily: "Inter",
    fontWeight: 500,
    fontSize: theme.typography.pxToRem(24),
    padding: theme.typography.pxToRem(5),
    marginLeft: theme.typography.pxToRem(18),
    color: grey[800],
    textAlign: "left",
  },
}));

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
  meta: PropTypes.object,
};

export default DIDMeta;
