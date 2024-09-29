import PropTypes from "prop-types";

import css from "./ErrorMessage.module.css";

export default function ErrorMessage({ helperText }) {
  return <p className={css.text}>{helperText}</p>;
}

ErrorMessage.propTypes = {
  helperText: PropTypes.string.isRequired,
};
