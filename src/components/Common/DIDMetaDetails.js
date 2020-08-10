import React from "react";
import { makeStyles } from "@material-ui/core";
import { grey } from "@material-ui/core/colors";

const useStyles = makeStyles({
  details: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "flex-start",
    alignItems: "flex-start",
    height: "100%",
    width: "100%",
    padding: 5,
    margin: 10,
  },
  detailItems: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 8,
    fontSize: 14,
  },
  itemLeft: {
    marginRight: 8,
    color: "#3e55ab",
    fontWeight: 500,
  },
  itemRight: {
      color: grey[800]
  }
});

function DIDMetaDetails(props) {
  const classes = useStyles();
  let key = 0;

  function processAttributes(attr) {
    switch (attr) {
      case "account":
        return "Account";
      case "name":
        return "DID Name";
      case "scope":
        return "Scope";
      case "created_at":
        return "Created";
      case "type":
        return "DID Type";
      case "updated_at":
        return "Updated";
      case "availability":
        return "Availability";
      case "monotonic":
        return "Monotonic";
      case "bytes":
        return "Size";
      case "is_open":
        return "Open";
      case "length":
        return "Length"
      default:
        return attr;
    }
  }

  return (
    <div id="did-meta-info" className={classes.details}>
      {Object.keys(props.meta).map((item) => (
        <div key={++key} className={classes.detailItems}>
          <div className={classes.itemLeft}>{processAttributes(item)}:</div>
          <div className={classes.itemRight}>{props.meta[item]}</div>
        </div>
      ))}
    </div>
  );
}

export default DIDMetaDetails;
