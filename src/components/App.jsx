import React, { useState, useEffect, useRef } from 'react';
import Form from './form/Form';
import { ContactList } from './contactList/ContactList';
import { Filter } from './filter/Filter';
import { nanoid } from 'nanoid';
import css from './App.module.css';

export const App = () => {
  const [contacts, setContacts] = useState(() => {
    const data = JSON.parse(localStorage.getItem('contacts'));

    return data || [];
  });

  const [filter, setFilter] = useState('');

  const firstRender = useRef(true);

  useEffect(() => {
    if (!firstRender.current) {
      localStorage.setItem('contacts', JSON.stringify(contacts));
    }
  }, [contacts]);
  useEffect(() => {
    firstRender.current = false;
  }, []);

  const addContact = ({ name, number }) => {
    console.log(name, number);
    const toLowerCaseName = name.toLowerCase();

    if (contacts.some(item => item.name.toLowerCase() === toLowerCaseName)) {
      alert(`${name} is already in contacts.`);
      return;
    }
    const newContact = {
      id: nanoid(),
      name,
      number,
    };
    setContacts(prevContacts => {
      return [...prevContacts, newContact];
    });
  };
  const deleteContact = id => {
    console.log(id);
    setContacts(prevContacts => prevContacts.filter(item => item.id !== id));
  };

  const changeFitler = ({ target }) => setFilter(target.value);

  const getVisibleContact = () => {
    if (!filter) {
      return contacts;
    }

    const normalizedFilter = filter.toLowerCase();

    const filteredBooks = contacts.filter(({ name, number }) => {
      const normalizedTitle = name.toLowerCase();
      const normalizedAuthor = number.toLowerCase();

      return (
        normalizedAuthor.includes(normalizedFilter) ||
        normalizedTitle.includes(normalizedFilter)
      );
    });

    return filteredBooks;
  };

  const data = getVisibleContact();
  return (
    <section className={css.section}>
      <h1 className={css.title}>Phonebook</h1>
      <Form onSubmit={addContact}></Form>

      <Filter value={filter} onChange={changeFitler}></Filter>
      <h2 className={css.titleContacts}> Contacts</h2>
      <ContactList data={data} onDeleteContact={deleteContact}></ContactList>
    </section>
  );
};
