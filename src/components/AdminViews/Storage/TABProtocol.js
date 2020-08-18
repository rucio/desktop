import React from "react";
import PropTypes from "prop-types";
import TabPanel from "./RSETabPanel";
import { TextField, makeStyles, InputLabel } from "@material-ui/core";
import ColoredLine from "../../Utils/ColoredLine";

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
  // const [values, setValues] = React.useState({
  //   extended_attributes: props.protocols.extended_attributes,
  //     hostname: props.protocols.hostname,
  //     prefix: props.protocols.prefix,
  //     domains: props.protocols.domains,
  //     scheme: props.protocols.scheme,
  //     port: props.protocols.port,
  //     impl: props.protocols.impl,
  // });

  // const handleChange = (event) => {
  //   setValues({
  //     ...values,
  //     [event.target.name]: event.target.value,
  //   });
  // };
  
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
                name="hostname"
                defaultValue={item.hostname}
              />
            </div>
            <div>
              <InputLabel className={classes.inputLabel}>Port</InputLabel>
              <TextField
                variant="outlined"
                size="small"
                type="number"
                name="port"
                className={classes.textfield}
                defaultValue={item.port}
              />
            </div>
          </div>
          <InputLabel className={classes.inputLabel}>Prefix</InputLabel>
          <TextField
            variant="outlined"
            size="small"
            name="item"
            className={classes.textfield}
            defaultValue={item.prefix}
          />
          <InputLabel className={classes.inputLabel}>Scheme</InputLabel>
          <TextField
            variant="outlined"
            size="small"
            name="scheme"
            className={classes.textfield}
            defaultValue={item.scheme}
          />
           <InputLabel className={classes.inputLabel}>Protocol</InputLabel>
           <TextField
            variant="outlined"
            size="small"
            name="impl"
            className={classes.textfield}
            defaultValue={item.impl}
          />
          <ColoredLine color="#000000" opacity={0.2}/>
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
