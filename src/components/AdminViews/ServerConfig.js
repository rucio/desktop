import React, { useState } from "react";
import { makeStyles, AccordionDetails } from "@material-ui/core";
import PropTypes from "prop-types";
import EditButtons from "./ServerConfigEditButtons";
import ServerConfigEditForm from "./ServerConfigEditForm";
import ServerConfigTitle from "./ServerConfigTitle";
import DialogNewSection from "./DialogNewSection";
import { useDispatch } from "react-redux";
import { addConfig, delConfig, getConfig } from "../Utils/Config";

const useStyles = makeStyles((theme) => ({
  root: {
    fontFamily: "Cern",
    fontSize: theme.typography.pxToRem(15),
    minWidth: "100%",
  },
  section: {
    padding: 2,
  },
  sectionTitle: {
    color: "#3e55ab",
    fontWeight: 500,
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    width: "60%",
  },
  options: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    maxWidth: "60%",
  },
  optionName: {
    overflowWrap: "break-word",
    padding: 10,
  },
  optionValue: {
    overflowWrap: "break-word",
    padding: 10,
  },
}));

function ServerConfig(props) {
  const classes = useStyles();
  const config = props.config;
  const [editSection, setEditSection] = useState(null);
  const [open, setOpen] = useState(false);
  const [section, setSection] = useState("");
  const [option, setOption] = useState("");
  const [value, setValue] = useState();
  const dispatch = useDispatch();

  const handleClose = () => {
    setOpen(false);
  };

  const handleNewSectionDialog = (section) => {
    setSection(section);
    setOpen(true);
  };

  const fetchConfig = async () => {
    getConfig(props.server)
      .then((res) => {
        if (res.status === 200) props.setConfig(res.data);
      })
      .catch((err) => console.log(err));
  };

  const handleOptionSubmit = () => {
    addConfig(props.server, {
      section: section,
      option: option,
      value: value,
    })
      .then((res) => props.setStatus(res.status))
      .then(setOpen(false))
      .then(setEditSection(null))
      .then(async () => await fetchConfig())
      .then(() => dispatch({ type: "SHOW_SNACKBAR" }));
  };

  function validateInput() {
    return section.length > 0 && option.length > 0;
  }

  const handleDelete = (server, section, option) => {
    delConfig(server, {
      section: section,
      option: option,
    })
      .then((res) => props.setStatus(res.status))
      .then(setOpen(false))
      .then(setEditSection(null))
      .then(async () => await fetchConfig())
      .then(() => dispatch({ type: "SHOW_SNACKBAR" }));
  };

  return (
    <AccordionDetails>
      <div className={classes.root}>
        <ServerConfigTitle
          server={props.server}
          onSectionAdd={() => setEditSection(null)}
          fetchConfig={fetchConfig}
        />
        {Object.keys(config).map((section, index) => (
          <div key={section} className={classes.section}>
            <div className={classes.sectionTitle}>
              {section}
              {index === editSection ? (
                <EditButtons
                  editMode={true}
                  cancelEdit={() => setEditSection(null)}
                  confirmEdit={() => console.log("Saved")}
                  newOption={() => handleNewSectionDialog(section)}
                />
              ) : (
                <EditButtons
                  editMode={false}
                  onClick={() => setEditSection(index)}
                />
              )}
            </div>
            {Object.keys(config[section]).map((option) => (
              <div key={option} className={classes.options}>
                {index === editSection ? (
                  <ServerConfigEditForm
                    section={section}
                    option={option}
                    optionValue={config[section][option]}
                    server={props.server}
                    handleDelete={() =>
                      handleDelete(props.server, section, option)
                    }
                  />
                ) : (
                  <React.Fragment>
                    <div id="option-name" className={classes.optionName}>
                      {option}
                    </div>
                    <div id="option-value" className={classes.optionValue}>
                      {config[section][option].toString()}
                    </div>
                  </React.Fragment>
                )}
              </div>
            ))}
          </div>
        ))}
      </div>
      <DialogNewSection
        section={section}
        setOption={setOption}
        setValue={setValue}
        disabled={!validateInput()}
        open={open}
        handleClose={handleClose}
        handleSubmit={handleOptionSubmit}
      />
    </AccordionDetails>
  );
}

ServerConfig.propTypes = {
  config: PropTypes.object,
  setConfig: PropTypes.func,
  server: PropTypes.string,
  setStatus: PropTypes.func,
};

export default ServerConfig;
