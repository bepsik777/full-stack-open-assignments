const AddNumberForm = ({onAddPerson, onNumberInput, onPersonInput, newNumber, newName}) => {
  return (
    <div>
      <h2>Add New</h2>
      <form action="" onSubmit={onAddPerson}>
        <div className="input-container">
          <label htmlFor="name">name</label>
          <input
            type="text"
            id="name"
            value={newName}
            onChange={onPersonInput}
          />
        </div>
        <div className="input-container">
          <label htmlFor="number">Phone number</label>
          <input
            type="text"
            id="number"
            value={newNumber}
            onChange={onNumberInput}
          />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
    </div>
  );
};

export default AddNumberForm;
