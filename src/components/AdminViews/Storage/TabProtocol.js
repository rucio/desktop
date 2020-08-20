import React from "react";
import PropTypes from "prop-types";
import TabPanel from "./RSETabPanel";
import {
  TextField,
  makeStyles,
  InputLabel,
  FormGroup,
  Button,
} from "@material-ui/core";
import ColoredLine from "../../Utils/ColoredLine";
import ConfirmChangeDialog from "./ConfirmChangeDialog";
import { updateProtocol } from "../../Utils/Storage";
import { useDispatch } from "react-redux";
import AlertSnackbar from "../../Utils/Snackbar";

const useStyles = makeStyles({
  inputLabel: {
    marginBottom: "0.8rem",
    color: "#354992",
  },
  host: {
    width: "60%",
  },
  textfield: {
    width: "50%",
    marginBottom: "1.2rem",
  },
  smallTextField: {
    width: "15%",
    margin: "0.5rem",
  },
});

function TabProtocol(props) {
  const classes = useStyles();
  const initialProtocols = props.protocols;
  const [currentIndex, setCurrentIndex] = React.useState(null);
  // eslint-disable-next-line no-unused-vars
  const [values, setValues] = React.useState(null);
  const [changes, setChanges] = React.useState({});
  const [nextProps, setNextProps] = React.useState(props);
  const [open, setOpen] = React.useState(false);
  const [status, setStatus] = React.useState(0);
  const dispatch = useDispatch();

  React.useEffect(() => {
    setNextProps({});
    setNextProps(props);
    setValues(null);
    setCurrentIndex(null);
    setChanges({});
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
    const scheme = initialProtocols[currentIndex].scheme;
    const hostname = initialProtocols[currentIndex].hostname;
    const port = initialProtocols[currentIndex].port;
    const currentAccount = localStorage.getItem("CURR_ACCOUNT");
    
    await updateProtocol(
      currentAccount,
      "rucio-server-x509",
      props.rse,
      scheme,
      hostname,
      port,
      values
    )
      .then((res) => setStatus(res.status))
      .then(dispatch({ type: "LOADING_FALSE" }))
      .then(setOpen(false))
      .then(() => dispatch({ type: "SHOW_SNACKBAR" }));
  };

  const handleChange = (event, index) => {
    setNextProps({
      protocols: [
        ...nextProps.protocols.slice(0, index),
        {
          ...nextProps.protocols[index],
          [event.target.name]: event.target.value,
        },
        ...nextProps.protocols.slice(index + 1),
      ],
    });
    setCurrentIndex(index);
    setValues({
      ...nextProps.protocols[index],
      [event.target.name]: event.target.value,
    });
    setChanges({
      ...changes,
      [event.target.name]: event.target.value,
    });
  };

  return (
    <React.Fragment>
      <TabPanel value={props.value} index={1}>
        {nextProps.protocols.map((item, index) => (
          <div key={`${item.hostname}:${item.port}`}>
            <div style={{ display: "flex", width: "100%" }}>
              <div>
                <InputLabel className={classes.inputLabel}>Hostname</InputLabel>
                <TextField
                  variant="outlined"
                  size="small"
                  fullWidth
                  name="hostname"
                  value={item.hostname}
                  onChange={(e) => handleChange(e, index)}
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
                  value={item.port}
                  onChange={(e) => handleChange(e, index)}
                />
              </div>
            </div>
            <InputLabel className={classes.inputLabel}>Prefix</InputLabel>
            <TextField
              variant="outlined"
              size="small"
              name="prefix"
              className={classes.textfield}
              value={item.prefix}
              onChange={(e) => handleChange(e, index)}
            />
            <InputLabel className={classes.inputLabel}>Scheme</InputLabel>
            <TextField
              variant="outlined"
              size="small"
              name="scheme"
              className={classes.textfield}
              value={item.scheme}
              onChange={(e) => handleChange(e, index)}
            />
            <InputLabel className={classes.inputLabel}>Protocol</InputLabel>
            <TextField
              variant="outlined"
              size="small"
              name="impl"
              className={classes.textfield}
              value={item.impl}
              onChange={(e) => handleChange(e, index)}
            />
            <InputLabel className={classes.inputLabel}>Domains</InputLabel>
            <InputLabel className={classes.inputLabel}>LAN</InputLabel>
            <FormGroup row style={{ paddingBottom: "1rem" }}>
              <TextField
                className={classes.smallTextField}
                size="small"
                variant="outlined"
                type="number"
                label="Read"
                value={item.domains.lan.read}
              />
              <TextField
                className={classes.smallTextField}
                size="small"
                variant="outlined"
                type="number"
                label="Write"
                value={item.domains.lan.write}
              />
              <TextField
                className={classes.smallTextField}
                size="small"
                variant="outlined"
                type="number"
                label="Delete"
                value={item.domains.lan.delete}
              />
            </FormGroup>
            <InputLabel className={classes.inputLabel}>WAN</InputLabel>
            <FormGroup row style={{ paddingBottom: "1rem" }}>
              <TextField
                className={classes.smallTextField}
                size="small"
                variant="outlined"
                type="number"
                label="Read"
                value={item.domains.wan.read}
              />
              <TextField
                className={classes.smallTextField}
                size="small"
                variant="outlined"
                type="number"
                label="Write"
                value={item.domains.wan.write}
              />
              <TextField
                className={classes.smallTextField}
                size="small"
                variant="outlined"
                type="number"
                label="Delete"
                value={item.domains.wan.delete}
              />
              <TextField
                className={classes.smallTextField}
                size="small"
                variant="outlined"
                type="number"
                label="Third Party Copy"
                value={item.domains.wan.third_party_copy}
              />
            </FormGroup>
            <Button
              variant="contained"
              color="primary"
              disabled={index !== currentIndex}
              onClick={() => setOpen(true)}
            >
              Update Protocol
            </Button>
            <ColoredLine color="#000000" opacity={0.2} />
          </div>
        ))}
      </TabPanel>
      <ConfirmChangeDialog
        open={open}
        initialValues={initialProtocols}
        currentIndex={currentIndex !== null ? currentIndex : 0}
        changes={changes}
        handleConfirm={() => handleUpdate()}
        handleClose={() => setOpen(false)}
      />
      {handleAlertBar(status)}
    </React.Fragment>
  );
}

TabProtocol.propTypes = {
  value: PropTypes.any.isRequired,
  protocols: PropTypes.array,
  rse: PropTypes.string,
};

export default TabProtocol;
