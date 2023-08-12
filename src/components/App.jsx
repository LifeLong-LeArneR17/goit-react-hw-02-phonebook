import React, { Component } from "react";
import { Contacts } from "./Contacts/Contacts";
import { nanoid } from "nanoid";
import { Filter } from "./Filter/Filter";
import { ContactsList } from "./Contacts/ContactsList/ContactsList";


const INITIAL_STATE = {
  contacts: [
    { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
    { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
    { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
    { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
  ],
  filter: '',
  name: '',
  number: '',
};


export class App extends Component {
state = {...INITIAL_STATE}
 
handleChange = evt => {
  const {name, value} = evt.target;
  this.setState({[name] : value});
}



hadleSubmit = evt => {
  evt.preventDefault();
   const {name, number} = this.state;
    // Проверка наличия контакта с таким именем

    const isDuplicate = this.state.contacts.some(contact => contact.name === name);
    if(isDuplicate) {
    alert(`Contact with name "${name}" already exists!`);
    return; // Прерываем выполнение функции
  }
  
   const NewContact = {
      // Создаем объект контакта
    id: nanoid(),
    name,
    number
   };


   this.setState((Prevstate) => ({
  contacts: [...Prevstate.contacts, NewContact],
  name: '',
  number: '',
}));
}


handleChangeFilter = evt => {
 this.setState({
  filter: evt.target.value
 });

 }

 onChangeDelete = evt => {
  const contactId = evt.target.id;
  this.setState(prevState => ({
    contacts: prevState.contacts.filter(el => el.id !== contactId)
  }));
}


  render() {
    const FilterContacts = this.state.contacts.filter(contact =>
      contact.name.toLowerCase().trim().includes(this.state.filter.toLowerCase())
    );
    
    return (
      <>
      <form onSubmit={this.hadleSubmit}>
      <h2>Name</h2>
      <input
  type="text"
  name= "name"
  pattern="^[a-zA-Zа-яА-Я]+(([' \-][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
  title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
  required
  value={this.state.name}
  onChange={this.handleChange}
/>
<h2>Number</h2>
<input
  type="tel"
  name="number"
  pattern="\+?\d{1,4}[-.\s]?\(?\d{1,3}\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
  title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
  required
  value={this.state.number}
  onChange={this.handleChange}
/>
<button type="submit" >Add contact</button>
<h2>Contacts</h2>
    <Filter onChange={this.handleChangeFilter} filter={this.state.filter}/>
    <ContactsList contacts={FilterContacts} onChangeDelete={this.onChangeDelete}/>

    </form>
      </>
    );
  }
}

export default App;
