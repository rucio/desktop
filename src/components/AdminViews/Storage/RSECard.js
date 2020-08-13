import React from "react";
import PropTypes from "prop-types";
import { Card, makeStyles, CardContent } from "@material-ui/core";
import { blue } from "@material-ui/core/colors";

const useStyles = makeStyles({
  root: {
    font: "Cern",
    maxHeight: 250,
    height: 200,
    minWidth: "60%",
    backgroundColor: blue.A400,
    borderRadius: 16.18,
    margin: 12
  },
  content: {
    height: "80%",
  },
  title: {
    display: "flex",
    alignItems: "center",
    justifyContent: "start",
    fontWeight: 600,
    letterSpacing: 1,
    padding: 20,
    paddingBottom: 10,
    fontSize: 20,
    color: "#ffffff",
  },
  id: {
    fontSize: 14,
    opacity: 0.8,
    color: "#ffffff",
    fontWeight: 500,
    paddingLeft: 20,
    paddingBottom: 10,
  },
  preInfo: {
    fontWeight: 600,
  },
  info: {
    fontSize: 16,
    color: "#ffffff",
    fontWeight: 500,
    margin: 20,
    height: 60,
    opacity: 0.85,
    display: "flex",
    flexDirection: "column",
    alignItems: "start",
    justifyContent: "space-between",
  },
});

function RSECard(props) {
  const classes = useStyles();

  const processRegion = () => {
    const city = props.details.city ? props.details.city : "";
    const country = props.details.country_name
      ? props.details.country_name
      : "";
    const continent = props.details.continent ? props.details.continent : "";
    const regionCode = props.details.region_code
      ? props.details.region_code
      : "";
    const regionStr = `${city} ${country} ${continent} ${regionCode}`;

    return regionStr.length > 3 ? regionStr : "Unknown";
  };

  return (
    <Card elevation={5} className={classes.root}>
      <CardContent className={classes.content}>
        <div className={classes.title}>{props.details.rse}</div>
        <div className={classes.id}>ID: {props.details.id}</div>
        <div id="rse-info" className={classes.info}>
          <div id="general">
            <span className={classes.preInfo}>Type: </span>
            {props.details.deterministic
              ? "Deterministic"
              : "Non-Deterministic"}
            , {props.details.volatile ? "Volatile" : "Non-Volatile"}{" "}
            {props.details.rse_type}
          </div>
          <div id="rse-region">
            <span className={classes.preInfo}>Region: </span>
            {processRegion()}
          </div>
          <div id="rse-created">
            <span className={classes.preInfo}>Created: </span>
            {props.details.created_at}{" "}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

RSECard.propTypes = {
  details: PropTypes.object,
};

export default RSECard;
