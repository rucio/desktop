import React from "react";
import PropTypes from "prop-types";
import TabPanel from "./RSETabPanel";
import {
  makeStyles,
  Checkbox,
  InputLabel,
  TextField,
  FormGroup,
  FormControlLabel,
  Radio,
} from "@material-ui/core";

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
  textfield: {
    width: "50%",
    marginBottom: 20,
  },
  inputLabel: {
    marginBottom: 10,
    color: "#354992",
  },
});

function TabGeneral(props) {
  const [values, setValues] = React.useState({});

  function isPresent(x) {
    return x || "";
  }

  const handleChange = (event) => {
    setValues({
      ...values,
      [event.target.name]: event.target.value,
    });
  };

  const classes = useStyles();
  return (
    <TabPanel value={props.value} index={0}>
      <InputLabel className={classes.inputLabel}>Type</InputLabel>
      <TextField
        variant="outlined"
        size="small"
        name="rse_type"
        className={classes.textfield}
        value={props.details.rse_type}
        onChange={handleChange}
      />
      <InputLabel className={classes.inputLabel}>Region</InputLabel>
      <div style={{ display: "flex", flex: 1 }}>
        <TextField
          variant="outlined"
          size="small"
          name="city"
          placeholder="City"
          className={classes.textfield}
          value={isPresent(props.moreDetails.city)}
          onChange={handleChange}
        />
        <TextField
          variant="outlined"
          size="small"
          name="country_name"
          placeholder="Country Name"
          className={classes.textfield}
          value={isPresent(props.moreDetails.country_name)}
          onChange={handleChange}
        />
        <TextField
          variant="outlined"
          size="small"
          name="continent"
          placeholder="Continent"
          className={classes.textfield}
          value={isPresent(props.moreDetails.continent)}
          onChange={handleChange}
        />
        <TextField
          variant="outlined"
          size="small"
          name="region_code"
          type="number"
          placeholder="Region Code"
          className={classes.textfield}
          value={isPresent(props.moreDetails.region_code)}
          onChange={handleChange}
        />
      </div>
      <InputLabel className={classes.inputLabel}>LFN2PFN Algorithm</InputLabel>
      <TextField
        variant="outlined"
        size="small"
        name="lfn2pfn_algorithm"
        className={classes.textfield}
        value={isPresent(props.details.lfn2pfn_algorithm)}
        onChange={handleChange}
      />
      <FormGroup row style={{ paddingBottom: 12 }}>
        <FormControlLabel
          control={<Radio checked={props.details.volatile} color="primary" />}
          label="Volatile"
        />
        <FormControlLabel
          control={<Radio checked={!props.details.volatile} color="primary" />}
          label="Non-Volatile"
        />
      </FormGroup>
      <FormGroup row style={{ paddingBottom: 12 }}>
        <FormControlLabel
          control={
            <Radio checked={props.details.deterministic} color="primary" />
          }
          label="Deterministic"
        />
        <FormControlLabel
          control={
            <Radio checked={!props.details.deterministic} color="primary" />
          }
          label="Non-Deterministic"
        />
      </FormGroup>
      <InputLabel className={classes.inputLabel}>
        Availability Attributes
      </InputLabel>
      <FormGroup row style={{ paddingBottom: 16 }}>
        <FormControlLabel
          style={{ paddingRight: 10 }}
          control={
            <Checkbox
              checked={props.details.availability_read}
              name="availability_read"
              color="primary"
            />
          }
          label="Read"
        />
        <FormControlLabel
          style={{ paddingRight: 10 }}
          control={
            <Checkbox
              checked={props.details.availability_write}
              name="availability_write"
              color="primary"
            />
          }
          label="Write"
        />
        <FormControlLabel
          style={{ paddingRight: 10 }}
          control={
            <Checkbox
              checked={props.details.availability_delete}
              name="availability_delete"
              color="primary"
            />
          }
          label="Delete"
        />
      </FormGroup>
    </TabPanel>
  );
}

TabGeneral.propTypes = {
  value: PropTypes.any.isRequired,
  details: PropTypes.object,
  moreDetails: PropTypes.object,
};

export default TabGeneral;
