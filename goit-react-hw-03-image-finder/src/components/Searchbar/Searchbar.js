import PropTypes from "prop-types";
import { useState } from 'react';
import "react-toastify/dist/ReactToastify.css";
import s from "./Searchbar.module.css";
import { toast } from "react-toastify";

function Searchbar({ onHandleSubmit }) {
  const [query, setQuery] = useState('');

  const onSubmit = e => {
    e.preventDefault();
    if (query.trim() === '') {
      return toast.info('😱 Please enter a value for search images!');
    }
    onHandleSubmit(query);
    setQuery('');
  };

  return (
    <header className={s.header}>
      <form className={s.form} onSubmit={onSubmit}>
        <button type="submit" className={s.btn}>
          <span className={s.label}>Search</span>
        </button>

        <input
          className={s.input}
          type="text"
          value={query}
          autoComplete="off"
          autoFocus
          placeholder="Search images and photos"
          onChange={({ target }) => setQuery(target.value)}
        />
      </form>
    </header>
  );
}

Searchbar.propTypes = {
  onHandleSubmit: PropTypes.func.isRequired,
};

export default Searchbar;
