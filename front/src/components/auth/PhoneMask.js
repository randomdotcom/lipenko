import React from "react";
import PropTypes from "prop-types";

import MaskedInput from "react-text-mask";

export default function PhoneMask(props) {
  const { inputRef, ...other } = props;

  return (
    <MaskedInput
      {...other}
      ref={ref => {
        inputRef(ref ? ref.inputElement : null);
      }}
      mask={[
        "+",
        "3",
        "7",
        "5",
        " ",
        "(",
        /[324]/,
        /[5394]/,
        ")",
        " ",
        /\d/,
        /\d/,
        /\d/,
        /\d/,
        /\d/,
        /\d/,
        /\d/
      ]}
      placeholderChar={"\u2000"}
      showMask
    />
  );
}

PhoneMask.propTypes = {
  inputRef: PropTypes.func.isRequired
};
