import { useState, useEffect } from "react";
import "./styles/App.css";
import Filter from "./components/Filter";
import AddNumberForm from "./components/AddNumberForm";
import NumberList from "./components/NumbersList";
import contactsService from "./services/contacts";

function App() {
  const [contacts, setcontacts] = useState(null);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [filter, setFilter] = useState("");
  const [notification, setNotification] = useState({
    text: "",
    isError: false,
  });

  useEffect(() => {
    contactsService.getAll().then((allContacts) => setcontacts(allContacts));
  }, []);

  const handleFilterChange = (e) => {
    setFilter(e.target.value);
  };

  const checkIfNameExist = (name) => {
    return contacts
      .map((el) => el.name.toLowerCase().trim())
      .includes(name.toLowerCase().trim());
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
      .then((newContact) => {
        updateNotification(`${newName} has been added to your contacts`, false);
        setcontacts([...contacts, newContact]);
      })
      .catch((e) => {
        updateNotification(e.response.data.error, true);
      });

    setNewName("");
    setNewNumber("");
  };

  const handleUpdateNumber = (id, updatedContact) => {
    contactsService
      .updateNumber(id, updatedContact)
      .then((updatedContact) => {
        setcontacts(
          contacts.map((contact) =>
            contact.id === id ? updatedContact : contact
          )
        );
        updateNotification(`${newName} number has been updated`, false);
      })
      .catch((e) => updateNotification(e.response.data.error, true));
    setNewName("");
    setNewNumber("");
  };

  const handleAddButton = (e) => {
    e.preventDefault();

    if (newName === "" || newNumber == "") {
      updateNotification("you must include name and phone number", true);
      return;
    }
    const newContact = { name: newName, number: newNumber };

    if (checkIfNameExist(newName)) {
      const id = contacts.find(
        (person) =>
          person.name.toLowerCase().trim() === newName.toLowerCase().trim()
      ).id;
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
        .then(() => setcontacts(contacts.filter((person) => person.id !== id)))
        .catch(() =>
          updateNotification(
            `${
              contacts.find((person) => person.id === id).name
            } was already deleted from the server`,
            true
          )
        );
    }
  };

  const updateNotification = (text, isError) => {
    setNotification({ text: text, isError: isError });

    setTimeout(() => {
      setNotification({ text: "", isError: false });
    }, 6000);
  };

  return (
    <div>
      <h2>Phonebook</h2>
      {notification.text.length != 0 && (
        <div
          className={`notification ${
            notification.isError ? "error" : "success"
          }`}
        >
          {notification.text}
        </div>
      )}
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
