import Listing from "./Listing";

const NumberList = ({ contacts, filter, onDelete }) => {
  return (
    <div>
      <h2>Numbers</h2>
      <ul>
        {contacts &&
          (filter.length != 0
            ? contacts
                .filter((person) => {
                  const filterToLower = filter.toLowerCase();
                  const nameToLower = person.name.toLowerCase();
                  return nameToLower.includes(filterToLower);
                })
                .map((person) => (
                  <Listing
                    person={person}
                    key={person.id}
                    onDelete={onDelete}
                  ></Listing>
                ))
            : contacts.map((person) => (
                <Listing
                  key={person.id}
                  person={person}
                  onDelete={onDelete}
                ></Listing>
              )))}
      </ul>
    </div>
  );
};

export default NumberList;
