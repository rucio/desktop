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
  Button,
} from "@material-ui/core";
import AlertSnackbar from "../../Utils/Snackbar";
import { useDispatch } from "react-redux";
import ConfirmChangeDialog from "./ConfirmChangeDialog";
import { updateRSESettings } from "../../Utils/Storage";
import { getCurrentServer } from "../../Utils/Servers";

const useStyles = makeStyles((theme) => ({
  preInfo: {
    fontWeight: 700,
    color: "#354992",
    marginRight: theme.typography.pxToRem(10),
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
    font: "Inter",
    width: "50%",
    marginBottom: theme.typography.pxToRem(20),
  },
  inputLabel: {
    fontFamily: "Inter",
    marginBottom: theme.typography.pxToRem(10),
    color: "#354992",
  },
  label: {
    paddingRight: theme.typography.pxToRem(10),
    fontFamily: "Inter",
  },
}));

function TabGeneral(props) {
  const [values, setValues] = React.useState(null);
  const [initialValues, setInitialValues] = React.useState(null);
  const allDetails = { ...props.details, ...props.moreDetails };
  const [nextProps, setNextProps] = React.useState(props);
  const [status, setStatus] = React.useState(0);
  const [open, setOpen] = React.useState(false);
  const currentAccount = localStorage.getItem("CURR_ACCOUNT");
  const currentServer = getCurrentServer();
  const dispatch = useDispatch();

  function isPresent(x) {
    return x || "";
  }

  React.useEffect(() => {
    setNextProps({});
    setNextProps(props);
    setValues(null);
    setInitialValues(null);
  }, [props]);

  function handleAlertBar(status) {
    switch (status) {
      case 200:
        return (
          <AlertSnackbar
            severity="success"
            message={`RSE Settings Updated!`}
            onExited={() => setStatus(0)}
          />
        );
      case 401:
        return (
          <AlertSnackbar
            severity="warning"
            message={`Cannot Authenticate`}
            onExited={() => setStatus(0)}
          />
        );
      case 500:
        return (
          <AlertSnackbar
            severity="error"
            message={`Error updating values!`}
            onExited={() => setStatus(0)}
          />
        );
      default:
        return <div />;
    }
  }

  const handleUpdate = async () => {
    dispatch({ type: "LOADING_TRUE" });
    

    await updateRSESettings(
      currentAccount,
      currentServer,
      allDetails.rse,
      allDetails.id,
      values,
      initialValues
    )
      .then((res) => setStatus(res.status))
      .then(dispatch({ type: "LOADING_FALSE" }))
      .then(setOpen(false))
      .then(() => dispatch({ type: "SHOW_SNACKBAR" }))
      .then(() => dispatch({ type: "TRIGGER_FETCH" }));
  };

  const str2bool = (value) => {
    if (value && typeof value === "string") {
      if (value.toLowerCase() === "true") return true;
      if (value.toLowerCase() === "false") return false;
    }
    return value;
  };

  const handleChange = (event) => {
    setNextProps({
      ...nextProps,
      details: {
        ...nextProps.details,
        [event.target.name]:
          event.target.type === "radio" || event.target.type === "checkbox"
            ? JSON.parse(event.target.value)
            : event.target.value,
      },
      moreDetails: {
        ...nextProps.moreDetails,
        [event.target.name]:
          event.target.type === "radio" || event.target.type === "checkbox"
            ? JSON.parse(event.target.value)
            : event.target.value,
      },
    });
    setValues({
      ...values,
      [event.target.name]: str2bool(event.target.value),
    });
    setInitialValues({
      ...initialValues,
      [event.target.name]: allDetails[event.target.name],
    });
  };

  const classes = useStyles();
  return (
    <React.Fragment>
      <TabPanel value={props.value} index={0}>
        <InputLabel className={classes.inputLabel}>Type</InputLabel>
        <TextField
          variant="outlined"
          size="small"
          name="rse_type"
          className={classes.textfield}
          value={nextProps.details.rse_type}
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
            value={nextProps.moreDetails.city || ""}
            onChange={handleChange}
          />
          <TextField
            variant="outlined"
            size="small"
            name="country_name"
            placeholder="Country Name"
            className={classes.textfield}
            value={isPresent(nextProps.moreDetails.country_name)}
            onChange={handleChange}
          />
          <TextField
            variant="outlined"
            size="small"
            name="continent"
            placeholder="Continent"
            className={classes.textfield}
            value={isPresent(nextProps.moreDetails.continent)}
            onChange={handleChange}
          />
          <TextField
            variant="outlined"
            size="small"
            name="region_code"
            type="number"
            placeholder="Region Code"
            className={classes.textfield}
            value={isPresent(nextProps.moreDetails.region_code)}
            onChange={handleChange}
          />
        </div>
        <InputLabel className={classes.inputLabel}>
          LFN2PFN Algorithm
        </InputLabel>
        <TextField
          variant="outlined"
          size="small"
          name="lfn2pfn_algorithm"
          className={classes.textfield}
          value={isPresent(nextProps.details.lfn2pfn_algorithm)}
          onChange={handleChange}
        />
        <FormGroup row style={{ paddingBottom: "0.75rem" }}>
          <FormControlLabel
            control={
              <Radio
                checked={JSON.parse(nextProps.details.volatile)}
                color="primary"
                name="volatile"
                value={true}
                type="radio"
                onChange={handleChange}
              />
            }
            className={classes.label}
            label="Volatile"
          />
          <FormControlLabel
            control={
              <Radio
                checked={JSON.parse(!nextProps.details.volatile)}
                name="volatile"
                value={false}
                color="primary"
                type="radio"
                onChange={handleChange}
              />
            }
            className={classes.label}
            label="Non-Volatile"
          />
        </FormGroup>
        <FormGroup row style={{ paddingBottom: "0.75rem" }}>
          <FormControlLabel
            control={
              <Radio
                checked={JSON.parse(nextProps.details.deterministic)}
                name="deterministic"
                value={true}
                color="primary"
                type="radio"
                onChange={handleChange}
              />
            }
            className={classes.label}
            label="Deterministic"
          />
          <FormControlLabel
            control={
              <Radio
                checked={JSON.parse(!nextProps.details.deterministic)}
                name="deterministic"
                value={false}
                color="primary"
                type="radio"
                onChange={handleChange}
              />
            }
            className={classes.label}
            label="Non-Deterministic"
          />
        </FormGroup>
        <InputLabel className={classes.inputLabel}>
          Availability Attributes
        </InputLabel>
        <FormGroup row style={{ paddingBottom: "1rem" }}>
          <FormControlLabel
            className={classes.label}
            control={
              <Checkbox
                checked={JSON.parse(nextProps.details.availability_read)}
                name="availability_read"
                color="primary"
                type="checkbox"
                value={!nextProps.details.availability_read}
                onChange={handleChange}
              />
            }
            label="Read"
          />
          <FormControlLabel
            className={classes.label}
            control={
              <Checkbox
                checked={JSON.parse(nextProps.details.availability_write)}
                name="availability_write"
                color="primary"
                type="checkbox"
                value={!nextProps.details.availability_write}
                onChange={handleChange}
              />
            }
            label="Write"
          />
          <FormControlLabel
            className={classes.label}
            control={
              <Checkbox
                checked={JSON.parse(nextProps.details.availability_delete)}
                name="availability_delete"
                color="primary"
                type="checkbox"
                value={!nextProps.details.availability_delete}
                onChange={handleChange}
              />
            }
            label="Delete"
          />
        </FormGroup>
        <Button
          variant="contained"
          color="primary"
          disabled={values === null}
          onClick={() => setOpen(true)}
        >
          Update Settings
        </Button>
      </TabPanel>
      <ConfirmChangeDialog
        open={open}
        initialValues={allDetails}
        changes={values || {}}
        handleConfirm={() => handleUpdate()}
        handleClose={() => setOpen(false)}
        currentIndex={null}
      />
      {handleAlertBar(status)}
    </React.Fragment>
  );
}

TabGeneral.propTypes = {
  value: PropTypes.any.isRequired,
  details: PropTypes.object,
  moreDetails: PropTypes.object,
};

export default TabGeneral;
