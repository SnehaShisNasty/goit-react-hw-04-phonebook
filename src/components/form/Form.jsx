import React, { useState } from 'react';
import { nanoid } from 'nanoid';
import css from './Form.module.css';

const INITIAL_STATE = {
  name: '',
  number: '',
};
const Form = ({ onSubmit }) => {
  const [state, setState] = useState({ ...INITIAL_STATE });

  const handleChange = e => {
    const { name, value } = e.currentTarget;

    setState({ ...state, [name]: value });
  };

  const handleSubmit = e => {
    e.preventDefault();
    console.log(state);
    onSubmit({ ...state });
    reset();
  };

  const reset = () => {
    setState({ name: '', number: '' });
  };

  const nameInputId = nanoid();
  const numberInputId = nanoid();
  return (
    <form onSubmit={handleSubmit} className={css.form}>
      <label htmlFor={nameInputId} className={css.label}>
        Name
        <input
          className={css.input}
          type="text"
          name="name"
          value={state.name}
          onChange={handleChange}
          id={nameInputId}
          required
        />
      </label>
      <label htmlFor={numberInputId} className={css.label}>
        Number
        <input
          className={css.input}
          type="tel"
          name="number"
          value={state.number}
          onChange={handleChange}
          id={numberInputId}
          required
        />
      </label>

      <button type="submit" className={css.submit}>
        Add Contact
      </button>
    </form>
  );
};

export default Form;
