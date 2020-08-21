import React, { useState } from "react";
import PropTypes from 'prop-types';
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import { Link } from "react-router-dom";
import PersonIcon from "@material-ui/icons/Person";
import PersonOutlineOutlinedIcon from "@material-ui/icons/PersonOutlineOutlined";
import SupervisorAccountIcon from "@material-ui/icons/SupervisorAccount";
import SupervisorAccountOutlinedIcon from "@material-ui/icons/SupervisorAccountOutlined";
import { makeStyles } from "@material-ui/core";
import "../../styles/shadow.css"

const useStyles = makeStyles((theme) => ({
  card: {
    height: theme.typography.pxToRem(150),
    width: theme.typography.pxToRem(200),
    margin: theme.typography.pxToRem(20),
    borderRadius: theme.typography.pxToRem(8)
  },
  cardContent: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    height: theme.typography.pxToRem(150),
    width: theme.typography.pxToRem(200),
    padding: theme.typography.pxToRem(20),
    fontSize: theme.typography.pxToRem(18),
    color: "inherit",
    textDecoration: "none",
  },
  cardIconEnter: {
    padding: theme.typography.pxToRem(20),
    color: "#3e55ab",
  },
  cardIcon: {
    padding: theme.typography.pxToRem(20),
    color: "#000000",
  },
}));

function LoginCard(props) {
  const classes = useStyles();
  const [enter, setEnter] = useState(false);

  return (
    <Card
      onMouseEnter={() => setEnter(true)}
      onMouseLeave={() => setEnter(false)}
      className={classes.card}
      elevation={4}
    >
      <CardActionArea
        className={classes.cardContent}
        onClick={localStorage.setItem("viewContext", (props.text).toLowerCase())}
      >
        <Link to={props.link} className={classes.cardContent}>
          {enter ? (
            props.iconFor === "admin" ? (
              <SupervisorAccountIcon
                fontSize="large"
                className={classes.cardIconEnter}
              />
            ) : (
              <PersonIcon fontSize="large" className={classes.cardIconEnter} />
            )
          ) : props.iconFor === "admin" ? (
            <SupervisorAccountOutlinedIcon
              fontSize="large"
              className={classes.cardIcon}
            />
          ) : (
            <PersonOutlineOutlinedIcon
              fontSize="large"
              className={classes.cardIcon}
            />
          )}
          {props.text}
        </Link>
      </CardActionArea>
    </Card>
  );
}

LoginCard.propTypes = {
  link: PropTypes.string,
  text: PropTypes.string,
  iconFor: PropTypes.string,
}

export default LoginCard;
