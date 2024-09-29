import toast from "react-hot-toast";
import PropTypes from "prop-types";

import css from "./SearchBar.module.css";

export default function SearchBar({ onSubmit }) {
  const handleSubmit = (e) => {
    e.preventDefault();

    const { value = "" } = e.target.elements?.searchValue ?? {};
    const normalizedValue = value.trim();

    if (!normalizedValue) {
      toast.error("Enter something in the field.");
      return;
    }

    onSubmit(normalizedValue);
  };

  return (
    <header className={css.header}>
      <form className={css.form} onSubmit={handleSubmit}>
        <input
          className={css.input}
          name="searchValue"
          type="text"
          autoComplete="off"
          autoFocus
          placeholder="Search images and photos"
        />
        <button className={css.button} type="submit">
          Search
        </button>
      </form>
    </header>
  );
}

SearchBar.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};
