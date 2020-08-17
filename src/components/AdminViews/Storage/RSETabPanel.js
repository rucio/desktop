import React from "react";
import PropTypes from "prop-types";
import { makeStyles, Box } from "@material-ui/core";

const useStyles = makeStyles({
  root: {
    display: "flex",
    flex: 1,
    height: "inherit",
    padding: 10,
    margin: 20,
    fontSize: "1rem",
    flexDirection: "column",
    justifyContent: "space-between",
  },
});

function TabPanel(props) {
  const { children, value, index, ...other } = props;
  const classes = useStyles();

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={3} className={classes.root}>
          <div>{children}</div>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

export default TabPanel;
