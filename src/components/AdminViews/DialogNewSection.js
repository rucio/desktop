import React from "react";
import PropTypes from "prop-types";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import { TextField, makeStyles } from "@material-ui/core";
import LoadingSpinner from "../Utils/LoadingSpinner";
import { useSelector } from "react-redux";

const useStyles = makeStyles({
  form: {
    display: "flex",
    flexDirection: "column",
  },
});

function DialogNewSection(props) {
  const classes = useStyles();
  const loading = useSelector(state => state.loading)
  return (
    <React.Fragment>
      <Dialog
        open={props.open}
        onClose={props.handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{props.title}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            {props.subtitle}
          </DialogContentText>
          {loading ? (
            <LoadingSpinner message={props.loadingMessage} />
          ) : (
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
          )}
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
  title: PropTypes.string,
  subtitle: PropTypes.string,
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
  loadingMessage: PropTypes.string,
};

export default DialogNewSection;
