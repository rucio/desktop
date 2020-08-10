import React, { useState } from "react";
import {
  Accordion,
  makeStyles,
  AccordionSummary,
  Typography,
} from "@material-ui/core";
import ExpandIcon from "@material-ui/icons/ExpandMore";
import AccountDetails from "./AccountDetails";
const useStyles = makeStyles({
  root: {
    fontFamily: "Cern",
    paddingTop: 10,
    paddingBottom: 30,
    fontSize: 16,
    width: "50%",
  },
});

function AccountConfig() {
  const classes = useStyles();
  const [expanded, setExpanded] = useState(false);
  const [details, showDetails] = useState(false);
  const [editSection, setEditSection] = useState(null);
  const allAccounts = JSON.parse(localStorage.getItem("Accounts"));
  let key = 0;

  const handleChange = (panel) => (event, isExpanded) => {
    event.preventDefault();
    setExpanded(isExpanded ? panel : false);
    showDetails(!details);
  };

  return (
    <div className={classes.root}>
      {allAccounts.map((account, index) => (
        <Accordion
          expanded={expanded === index}
          onChange={handleChange(index)}
          key={++key}
        >
          <AccordionSummary
            expandIcon={<ExpandIcon />}
            aria-controls={`${account.account}-content`}
            id={`${account.account}-header`}
          >
            <Typography className={classes.listItem}>
              {account.account}
            </Typography>
          </AccordionSummary>
          {index === editSection ? (
            <AccountDetails
              details={account}
              editMode={true}
              cancel={() => setEditSection(null)}
            />
          ) : (
            <AccountDetails
              details={account}
              setEdit={() => setEditSection(index)}
            />
          )}
        </Accordion>
      ))}
    </div>
  );
}

export default AccountConfig;
