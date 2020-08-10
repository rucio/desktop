import React from "react";
import PropTypes from "prop-types";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import { TextField, makeStyles } from "@material-ui/core";

const useStyles = makeStyles({
  form: {
    display: "flex",
    flexDirection: "column",
  },
});

function DialogNewSection(props) {
  const classes = useStyles();
  return (
    <React.Fragment>
      <Dialog
        open={props.open}
        onClose={props.handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{"Add New Section"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Please enter Section name with at least one option and value
          </DialogContentText>
          <form className={classes.form}>
            <TextField
              label="Section"
              autoFocus
              required
              disabled={props.section}
              defaultValue={props.section}
              onChange={(e) => props.setSection(e.target.value)}
            />
            <TextField
              label="Option"
              required
              onChange={(e) => props.setOption(e.target.value)}
            />
            <TextField
              label="Value"
              required
              onChange={(e) => props.setValue(e.target.value)}
            />
          </form>
        </DialogContent>
        <DialogActions>
          <Button onClick={props.handleClose} color="secondary">
            Cancel
          </Button>
          <Button
            disabled={props.disabled}
            onClick={() => props.handleSubmit()}
            color="primary"
            variant="contained"
            autoFocus
          >
            Add
          </Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}

DialogNewSection.propTypes = {
  setSection: PropTypes.func,
  setOption: PropTypes.func,
  setValue: PropTypes.func,
  option: PropTypes.string,
  disabled: PropTypes.bool,
  section: PropTypes.string,
  server: PropTypes.string,
  open: PropTypes.bool,
  handleClose: PropTypes.func,
  handleSubmit: PropTypes.func,
};

export default DialogNewSection;
