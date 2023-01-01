import { useState, useEffect } from 'react';
import { nanoid } from 'nanoid';
import Filter from './Filter/Filter';
import ContactList from './ContactList/ContactList';
import ContactForm from './ContactForm/ContactForm';

const useLocalStorage = (key, defaultValue) => {
  const [state, setState] = useState(() => {
    return JSON.parse(window.localStorage.getItem(key)) ?? defaultValue;
  });

  useEffect(() => {
    window.localStorage.setItem(key, JSON.stringify(state));
  }, [key, state]);

  return [state, setState];
};

export default function App() {
  const [contacts, setContacts] = useLocalStorage('contacts', []);
  const [filter, setFilter] = useState('');

  const changeFilter = eve => {
    setFilter(eve.currentTarget.value);
  };

  const getFilteredOutContacts = () => {
    const normalizeFilter = filter.toLowerCase();
    return contacts.filter(person =>
      person.name.toLowerCase().includes(normalizeFilter)
    );
  };

  const formSubmitHandler = data => {
    contacts.map(contact => contact.name).includes(data.name)
      ? alert(`${data.name} is already in contacts.`)
      : setContacts(prevState => [
          ...prevState,
          { id: nanoid(), name: data.name, number: data.number },
        ]);
  };

  const deletContact = contactsId => {
    setContacts(prevState => [
      ...prevState.filter(item => item.id !== contactsId),
    ]);
  };

  const filteredOutContactsList = getFilteredOutContacts();
  return (
    <div>
      <h2>Phonebook</h2>
      <ContactForm onSubmit={formSubmitHandler} />

      <h2>Contacts</h2>
      <Filter value={filter} onChange={changeFilter} />
      <ContactList
        itemList={filteredOutContactsList}
        onDeleteClick={deletContact}
      />
    </div>
  );
}
