import React from "react";
import PropTypes from "prop-types";
import { AccordionDetails, makeStyles } from "@material-ui/core";
import AccountDetailsForm from "./AccountDetailsForm";
import { getAccountConfig, updateConfig, deleteConfig } from "../Utils/User";
import AccountEditButtons from "./AccountEditButtons";
import { useDispatch } from "react-redux";
import AccountDeleteDialog from "./AccountDeleteDialog";

const useStyles = makeStyles({
  root: {
    display: "flex",
    flexDirection: "column",
  },
  item: {
    display: "flex",
    justifyContent: "space-between",
    overflowWrap: "break-word",
    padding: 10,
  },
  option: {
    minWidth: "30%",
  },
  value: {
    width: "70%",
    textAlign: "left",
  },
});

function AccountDetails(props) {
  const classes = useStyles();
  const account = props.details;
  const dispatch = useDispatch();
  const [config, index] = getAccountConfig(
    account.account,
    account.server_name
  );
  const [open, setOpen] = React.useState(false);
  let key = 0;

  const handleChange = (e) => {
    config[e.target.id] = e.target.value;
  };

  const handleSave = (e) => {
    e.preventDefault();
    updateConfig(config, index)
      .then(() => dispatch({ type: "SHOW_SNACKBAR" }))
      .then(() => props.cancel());
  };

  const handleAccountDelete = (e) => {
    e.preventDefault();
    deleteConfig(index)
      .then(() => dispatch({ type: "SHOW_SNACKBAR" }))
      .then(() => setOpen(false));
  };

  return (
    <AccordionDetails className={classes.root}>
      {Object.keys(account).map((config) => (
        <div className={classes.item} key={++key}>
          {props.editMode ? (
            <AccountDetailsForm
              onChange={(e) => handleChange(e)}
              keyValue={config}
              value={account[config]}
            />
          ) : (
            <React.Fragment>
              <div className={classes.option}>{config}</div>
              <div className={classes.value}>{account[config]}</div>
            </React.Fragment>
          )}
        </div>
      ))}
      {props.editMode ? (
        <AccountEditButtons
          editMode={props.editMode}
          save={(e) => handleSave(e)}
          cancel={() => props.cancel()}
        />
      ) : (
        <AccountEditButtons
          editMode={false}
          setEdit={() => props.setEdit()}
          confirm={() => setOpen(true)}
        />
      )}
      <AccountDeleteDialog
        open={open}
        handleClose={() => setOpen(false)}
        account={account.account}
        server={account.server_name}
        handleConfirm={(e) => handleAccountDelete(e)}
      />
    </AccordionDetails>
  );
}

AccountDetails.propTypes = {
  editMode: PropTypes.bool,
  details: PropTypes.object,
  cancel: PropTypes.func,
  setEdit: PropTypes.func,
};

export default AccountDetails;
