import React from "react";
import PropTypes from "prop-types";
import {
  Card,
  makeStyles,
  CardContent,
  CardActionArea,
} from "@material-ui/core";
import StorageRoundedIcon from "@material-ui/icons/StorageRounded";

const useStyles = makeStyles((theme) => ({
  root: {
    fontFamily: "Inter",
    flex: "1 0 16rem",
    backgroundColor: (props) => (props.selected ? "#2c3c79" : "#fbfcfe"),
    borderRadius: theme.typography.pxToRem(16.18),
    margin: "1rem",
    height: "12em"
  },
  content: {
    display: "flex",
    alignItems: "start",
  },
  icon: {
    color: (props) => (props.selected ? "#7285cc" : "#354992"),
    margin: theme.typography.pxToRem(20),
    marginRight: theme.typography.pxToRem(10),
    fontSize: theme.typography.pxToRem(48),
  },
  title: {
    display: "flex",
    alignItems: "center",
    justifyContent: "start",
    fontWeight: (props) => (props.selected ? 600 : 500),
    letterSpacing: theme.typography.pxToRem(1),
    padding: theme.typography.pxToRem(20),
    paddingBottom: theme.typography.pxToRem(10),
    fontSize: theme.typography.pxToRem(20),
    opacity: (props) => (props.selected ? 1 : 0.8),
    color: (props) => (props.selected ? "#ffffff" : "#000000"),
  },
  id: {
    fontSize: theme.typography.pxToRem(14),
    opacity: (props) => (props.selected ? 0.8 : 0.6),
    color: (props) => (props.selected ? "#ffffff" : "#000000"),
    fontWeight: 500,
    paddingLeft: theme.typography.pxToRem(20),
    paddingBottom: theme.typography.pxToRem(10),
  },
  preInfo: {
    fontWeight: 700,
    color: (props) => (props.selected ? "#b0bbe2" : "#354992"),
  },
  info: {
    fontSize: theme.typography.pxToRem(16),
    color: (props) => (props.selected ? "#ffffff" : "#000000"),
    fontWeight: 500,
    margin: theme.typography.pxToRem(20),
    height: theme.typography.pxToRem(50),
    opacity: 0.8,
    display: "flex",
    flexDirection: "column",
    alignItems: "start",
    justifyContent: "space-between",
  },
}));

function RSECard(props) {
  const classes = useStyles({ selected: props.selected });

  const processRegion = () => {
    const city = props.details.city ? props.details.city : "";
    const country = props.details.country_name
      ? props.details.country_name
      : "";
    const continent = props.details.continent ? props.details.continent : "";
    const regionCode = props.details.region_code
      ? `(${props.details.region_code})`
      : "";
    const regionStr = `${city} ${country} ${continent} ${regionCode}`;

    return regionStr.length > 3 ? regionStr : "Unknown";
  };

  return (
    <Card elevation={3} className={classes.root}>
      <CardActionArea
        onClick={() => {
          props.setIndex(props.details.id);
          props.setCurrentRSE(props.details.rse);
          props.setRSEDetails(props.details)
        }}
      >
        <CardContent className={classes.content}>
          <StorageRoundedIcon className={classes.icon} />
          <div id="rse">
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
            </div>
          </div>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}

RSECard.propTypes = {
  details: PropTypes.object,
  selected: PropTypes.bool,
  setIndex: PropTypes.func,
  setCurrentRSE: PropTypes.func,
  setRSEDetails: PropTypes.func
};

export default RSECard;
