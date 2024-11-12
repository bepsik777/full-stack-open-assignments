import { useState, useEffect } from "react";
import axios from "axios";
import "./styles/App.css";
import Filter from "./components/Filter";
import AddNumberForm from "./components/AddNumberForm";
import NumberList from "./components/NumbersList";

function App() {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [filter, setFilter] = useState("");

  useEffect(() => {
    axios.get("http://localhost:3001/persons")
    .then(response => setPersons(response.data))
  }, [])

  const handleFilterChange = (e) => {
    setFilter(e.target.value);
  };

  const checkIfNameExist = (name) => {
    return persons.map((el) => el.name).includes(name);
  };

  const handlePersonInput = (e) => {
    setNewName(e.target.value);
  };

  const handleNumberInput = (e) => {
    setNewNumber(e.target.value);
  };

  const handleAddPerson = (e) => {
    e.preventDefault();

    if (newName === "" || newNumber == "") {
      alert("you must include name and phone number");
      return;
    }

    if (checkIfNameExist(newName)) {
      alert(`${newName} already exist in the phoebook`);
    } else {
      setPersons([...persons, { name: newName, number: newNumber }]);
    }
    setNewName("");
    setNewNumber("");
  };

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter onFilterChange={handleFilterChange}></Filter>
      <AddNumberForm
        onAddPerson={handleAddPerson}
        onNumberInput={handleNumberInput}
        onPersonInput={handlePersonInput}
        newName={newName}
        newNumber={newNumber}
      ></AddNumberForm>
      <NumberList persons={persons} filter={filter}></NumberList>
    </div>
  );
}

export default App;
