import { useState, useEffect } from "react";
import "./styles/App.css";
import Filter from "./components/Filter";
import AddNumberForm from "./components/AddNumberForm";
import NumberList from "./components/NumbersList";
import contactsService from "./services/contacts";

function App() {
  const [contacts, setcontacts] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [filter, setFilter] = useState("");

  useEffect(() => {
    contactsService.getAll().then((allContacts) => setcontacts(allContacts));
  }, []);

  const handleFilterChange = (e) => {
    setFilter(e.target.value);
  };

  const checkIfNameExist = (name) => {
    return contacts.map((el) => el.name).includes(name);
  };

  const handlePersonInput = (e) => {
    setNewName(e.target.value);
  };

  const handleNumberInput = (e) => {
    setNewNumber(e.target.value);
  };

  const handleAddContact = (newContact) => {

    contactsService
      .addContact(newContact)
      .then((newContact) => setcontacts([...contacts, newContact]));

    setNewName("");
    setNewNumber("");
  };

  const handleUpdateNumber = (id, updatedContact) => {
    contactsService
      .updateNumber(id, updatedContact)
      .then((updatedContact) => setcontacts(contacts.map(contact => contact.id === id ? updatedContact : contact)));
    setNewName("");
    setNewNumber("");
  };

  const handleAddButton = (e, id) => {
    e.preventDefault();

    if (newName === "" || newNumber == "") {
      alert("you must include name and phone number");
      return;
    }
    const newContact = { name: newName, number: newNumber };


    if (checkIfNameExist(newName)) {
      const id = contacts.find(person => person.name === newName).id
      window.confirm(
        `${newName} already added to phonebook, are you sure you want to update number`
      ) && handleUpdateNumber(id, newContact);
    } else {
      handleAddContact(newContact);
    }
  };

  const handleDeleteContact = (id, name) => {
    if (
      window.confirm(
        `Are you sure you want to remove ${name} from your contacts?`
      )
    ) {
      contactsService
        .deleteContact(id)
        .then((response) => console.log(response))
        .then(() => setcontacts(contacts.filter((person) => person.id !== id)));
    }
  };

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter onFilterChange={handleFilterChange}></Filter>
      <AddNumberForm
        onAddPerson={handleAddButton}
        onNumberInput={handleNumberInput}
        onPersonInput={handlePersonInput}
        newName={newName}
        newNumber={newNumber}
      ></AddNumberForm>
      <NumberList
        contacts={contacts}
        filter={filter}
        onDelete={handleDeleteContact}
      ></NumberList>
    </div>
  );
}

export default App;
