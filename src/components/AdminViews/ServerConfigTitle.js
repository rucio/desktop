import React, { useState } from "react";
import PropTypes from "prop-types";
import { makeStyles, IconButton } from "@material-ui/core";
import AddIcon from "@material-ui/icons/Add";
import DialogNewSection from "./DialogNewSection";
import { addConfig } from "../Utils/Config";
import { useDispatch } from "react-redux";
import AlertSnackbar from "../Utils/Snackbar";

const useStyles = makeStyles({
  title: {
    fontFamily: "Cern",
    fontWeight: 500,
    fontSize: 14,
    color: "#000000",
    width: "60%",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
  },
});

function ServerConfigTitle(props) {
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const [section, setSection] = useState("");
  const [option, setOption] = useState("");
  const [value, setValue] = useState();
  const [status, setStatus] = useState(0);
  const dispatch = useDispatch();

  const handleClose = () => {
    setOpen(false);
  };

  const handleNewSectionSubmit = () => {
    dispatch({ type: "LOADING_TRUE" })
    addConfig(props.server, {
      section: section,
      option: option,
      value: value,
    })
      .then((res) => setStatus(res.status))
      .then(props.onSectionAdd())
      .then(async () => await props.fetchConfig())
      .then(dispatch({ type: "LOADING_FALSE" }))
      .then(setOpen(false))
      .then(() => dispatch({ type: "SHOW_SNACKBAR" }));
  };

  function validateInput() {
    return section.length > 0 && option.length > 0;
  }

  function handleAlertBar(status) {
    switch (status) {
      case 200:
        return (
          <AlertSnackbar
            severity="success"
            message={`Section Added!`}
            onExited={() => setStatus(0)}
          />
        );
      case 401:
        return (
          <AlertSnackbar
            severity="warning"
            message={`Cannot Authenticate!`}
            onExited={() => setStatus(0)}
          />
        );
      case 500:
        return (
          <AlertSnackbar
            severity="error"
            message={`Error Adding Section!`}
            onExited={() => setStatus(0)}
          />
        );
      default:
        return <div />;
    }
  }

  return (
    <React.Fragment>
      <div id="title" className={classes.title}>
        <span style={{ opacity: 0.5 }}>Config</span>
        <IconButton onClick={() => setOpen(true)}>
          <AddIcon fontSize="inherit" color="primary" />
        </IconButton>
        <DialogNewSection
          title="Add New Section"
          subtitle="Please enter Section name with at least one option and value"
          loadingMessage="Adding new section"
          setSection={setSection}
          setOption={setOption}
          setValue={setValue}
          disabled={!validateInput()}
          open={open}
          handleClose={handleClose}
          handleSubmit={handleNewSectionSubmit}
        />
      </div>
      {handleAlertBar(status)}
    </React.Fragment>
  );
}

ServerConfigTitle.propTypes = {
  server: PropTypes.string,
  onSectionAdd: PropTypes.func,
  fetchConfig: PropTypes.func,
};

export default ServerConfigTitle;
