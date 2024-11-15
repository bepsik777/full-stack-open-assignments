import { useState, useEffect } from "react";
import restCoutries from "./services/restCoutries";
import Search from "./components/Search";
import CountryList from "./components/CountryList";
import CountryDetails from "./components/CountryDetails";
import "./App.css";

function App() {
  const [filter, setFilter] = useState("");
  const [allCountries, setAllCountries] = useState(null);
  const [filteredCountries, setFilteredCountries] = useState(null);

  useEffect(() => {
    restCoutries.getAll().then((data) => {
      setAllCountries(data);
    });
  }, []);

  const handleInputChange = (e) => {
    const newValue = e.target.value;
    setFilteredCountries(
      allCountries.filter((country) => {
        return country.name.common
          .toLowerCase()
          .includes(newValue.toLowerCase());
      })
    );
    setFilter(newValue);
  };

  return (
    <div>
      <Search value={filter} setValue={handleInputChange}></Search>
      {filter &&
      filteredCountries.length <= 10 ? (
        filteredCountries.length === 1 ? (
          <CountryDetails country={filteredCountries[0]}></CountryDetails>
        ) : (
          <CountryList countries={filteredCountries}></CountryList>
        )
      ) : (
        <p>Too many matches, specify another filter</p>
      )}
    </div>
  );
}

export default App;
