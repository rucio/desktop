import React from "react";
import PropTypes from "prop-types";
import TabPanel from "./RSETabPanel";
import { TextField, makeStyles, InputLabel } from "@material-ui/core";

const useStyles = makeStyles({
  inputLabel: {
    marginBottom: 10,
    color: "#354992",
  },
  host: {
    width: "60%"
  },
  textfield: {
    width: "50%",
    marginBottom: 20,
  },
});

function TABProtocol(props) {
  const classes = useStyles();
  return (
    <TabPanel value={props.value} index={1}>
      {props.protocols.map((item) => (
        <div key={`${item.hostname}:${item.port}`}>
          <div style={{ display: "flex", width: "100%" }}>
            <div>
              <InputLabel className={classes.inputLabel}>Hostname</InputLabel>
              <TextField
                variant="outlined"
                size="small"
                fullWidth
                defaultValue={item.hostname}
              />
            </div>
            <div>
              <InputLabel className={classes.inputLabel}>Port</InputLabel>
              <TextField
                variant="outlined"
                size="small"
                type="number"
                className={classes.textfield}
                defaultValue={item.port}
              />
            </div>
          </div>
          <InputLabel className={classes.inputLabel}>Prefix</InputLabel>
          <TextField
            variant="outlined"
            size="small"
            className={classes.textfield}
            defaultValue={item.prefix}
          />
          <InputLabel className={classes.inputLabel}>Scheme</InputLabel>
        </div>
      ))}
    </TabPanel>
  );
}

TABProtocol.propTypes = {
  value: PropTypes.any.isRequired,
  protocols: PropTypes.array,
};

export default TABProtocol;
