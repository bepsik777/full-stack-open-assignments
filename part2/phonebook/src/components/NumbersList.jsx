const NumberList = ({ persons, filter }) => {
  return (
    <div>
      <h2>Numbers</h2>
      <ul>
        {filter.length != 0
          ? persons
              .filter((person) => {
                const filterToLower = filter.toLowerCase();
                const nameToLower = person.name.toLowerCase();
                return nameToLower.includes(filterToLower);
              })
              .map((person) => <li>{person.name + " " + person.number}</li>)
          : persons.map((person) => (
              <li key={person.name}>{person.name + " " + person.number}</li>
            ))}
      </ul>
    </div>
  );
};

export default NumberList
