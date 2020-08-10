import React from "react";
import PropTypes from "prop-types";
import { Button, makeStyles } from "@material-ui/core";

const useStyles = makeStyles({
  editBtn: {
    margin: 20,
    marginLeft: 10
  },
});

function AccountEditButtons(props) {
  const classes = useStyles();
  switch (props.editMode) {
    case true:
      return (
        <div>
          <Button className={classes.editBtn} size="small" onClick={props.save} color="primary" variant="outlined">
            Save
          </Button>
          <Button className={classes.editBtn} size="small" onClick={props.cancel} color="secondary" variant="outlined">
            Cancel
          </Button>
        </div>
      );
    default:
      return (
        <div>
          <Button
            onClick={props.setEdit}
            size="small"
            color="primary"
            variant="outlined"
            className={classes.editBtn}
          >
            Edit
          </Button>
          <Button
            size="small"
            color="secondary"
            variant="outlined"
            className={classes.editBtn}
            onClick={props.confirm}
          >
            Delete Account
          </Button>
        </div>
      );
  }
}

AccountEditButtons.propTypes = {
  setEdit: PropTypes.func,
  save: PropTypes.func,
  cancel: PropTypes.func,
  confirm: PropTypes.func,
  editMode: PropTypes.bool,
};

export default AccountEditButtons;
