const Listing = ({ person, onDelete }) => {
  return (
    <li className="listing">
      {person.name + " " + person.number}
      <button onClick={() => onDelete(person.id, person.name)}>Delete</button>
    </li>
  );
};

export default Listing;
