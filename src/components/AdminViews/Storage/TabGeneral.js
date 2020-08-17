import React from "react";
import PropTypes from "prop-types";
import TabPanel from "./RSETabPanel";
import { makeStyles, Checkbox } from "@material-ui/core";

const useStyles = makeStyles({
  preInfo: {
    fontWeight: 600,
    color: "#354992",
    marginRight: 10,
  },
  info: {
    color: "#000000",
    fontWeight: 400,
    opacity: 0.8,
    display: "flex",
    alignItems: "center",
    marginBottom: "1rem",
  },
});

function TabGeneral(props) {
  const processRegion = () => {
    const city = props.moreDetails.city ? props.moreDetails.city : "";
    const country = props.moreDetails.country_name
      ? props.moreDetails.country_name
      : "";
    const continent = props.moreDetails.continent
      ? props.moreDetails.continent
      : "";
    const regionCode = props.moreDetails.region_code
      ? `(${props.moreDetails.region_code})`
      : "";
    const regionStr = `${city} ${country} ${continent} ${regionCode}`;

    return regionStr.length > 3 ? regionStr : "Unknown";
  };

  const classes = useStyles();
  return (
    <TabPanel value={props.value} index={0}>
      <div id="type" className={classes.info}>
        <span className={classes.preInfo}>Type: </span>
        {props.details.rse_type}
      </div>
      <div id="volatile" className={classes.info}>
        <span className={classes.preInfo}>Region: </span>
        {processRegion()}
      </div>
      <div id="lfn2pfn" className={classes.info}>
        <span className={classes.preInfo}>LFN2PFN Algorithm: </span>
        {props.details.lfn2pfn_algorithm}
      </div>
      <div id="deterministic" className={classes.info}>
        <span className={classes.preInfo}>Deterministic: </span>
        <Checkbox
          checked={props.details.deterministic}
          name="present"
          color="primary"
        />
      </div>
      <div id="volatile" className={classes.info}>
        <span className={classes.preInfo}>Volatile: </span>
        {props.details.volatile.toString()}
      </div>
    </TabPanel>
  );
}

TabGeneral.propTypes = {
  value: PropTypes.any.isRequired,
  details: PropTypes.object,
  moreDetails: PropTypes.object,
};

export default TabGeneral;
