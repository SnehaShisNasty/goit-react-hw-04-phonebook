import React from 'react';
import css from './Filter.module.css';

export const Filter = ({ value, onChange }) => (
  <form className={css.form}>
    <label className={css.filterLabel}>
      Filter
      <input
        type="text"
        value={value}
        onChange={onChange}
        className={css.filterInput}
      />
    </label>
  </form>
);
