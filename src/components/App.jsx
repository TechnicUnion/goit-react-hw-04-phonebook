import React, { Component } from 'react';
import { nanoid } from 'nanoid';
import Filter from './Filter/Filter';
import ContactList from './ContactList/ContactList';
import ContactForm from './ContactForm/ContactForm';

class App extends Component {
  state = {
    contacts: [],
    filter: '',
  };

  changeFilter = eve => {
    this.setState({ filter: eve.currentTarget.value });
  };

  getFilteredOutContacts = () => {
    const normalizeFilter = this.state.filter.toLowerCase();
    return this.state.contacts.filter(person =>
      person.name.toLowerCase().includes(normalizeFilter)
    );
  };

  formSubmitHandler = data => {
    this.state.contacts.map(contact => contact.name).includes(data.name)
      ? alert(`${data.name} is already in contacts.`)
      : this.setState(prevState => ({
          contacts: [
            ...prevState.contacts,
            { id: nanoid(), name: data.name, number: data.number },
          ],
        }));
  };

  deletContact = contactsId => {
    this.setState(prevState => ({
      contacts: prevState.contacts.filter(item => item.id !== contactsId),
    }));
  };

  componentDidMount() {
    const contactsFromLocalStorade = JSON.parse(
      localStorage.getItem('contacts')
    );
    if (contactsFromLocalStorade) {
      this.setState({ contacts: contactsFromLocalStorade });
    }
  }

  componentDidUpdate(prevState) {
    if (this.state.contacts !== prevState.contacts) {
      localStorage.setItem('contacts', JSON.stringify(this.state.contacts));
    }
  }

  render() {
    const filteredOutContactsList = this.getFilteredOutContacts();
    return (
      <div>
        <h2>Phonebook</h2>
        <ContactForm onSubmit={this.formSubmitHandler} />

        <h2>Contacts</h2>
        <Filter value={this.state.filter} onChange={this.changeFilter} />
        <ContactList
          itemList={filteredOutContactsList}
          onDeleteClick={this.deletContact}
        />
      </div>
    );
  }
}

export default App;
