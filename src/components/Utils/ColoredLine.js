import React from "react";
import PropTypes from "prop-types";

export default function ColoredLine(props) {
  return (
    <hr
      style={{
        color: props.color,
        backgroundColor: props.color,
        width: "100%",
        height: 1,
        opacity: props.opacity || 1,
        borderStyle: "inset",
        borderWidth: 0,
        overflow: "hidden",
        margin: 20,
      }}
    />
  );
}

ColoredLine.propTypes = {
    color: PropTypes.string.isRequired,
    opacity: PropTypes.number
}