const Filter = ({filter, onFilterChange}) => {
  return (
    <div className="input-container">
      <label htmlFor="search">search</label>
      <input
        type="text"
        id="search"
        value={filter}
        onChange={onFilterChange}
      />
    </div>
  );
};

export default Filter;
