import React from "react";
import PropTypes from "prop-types";

export default function ColoredLine(props) {
  return (
    <hr
      style={{
        color: props.color,
        backgroundColor: props.color,
        width: "100%",
        height: "0.0625rem",
        opacity: props.opacity || 1,
        borderStyle: "inset",
        borderWidth: 0,
        overflow: "hidden",
        margin: "1.25rem",
      }}
    />
  );
}

ColoredLine.propTypes = {
    color: PropTypes.string.isRequired,
    opacity: PropTypes.number
}