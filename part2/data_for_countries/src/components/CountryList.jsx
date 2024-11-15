import CountryListing from "./CountryListing";

const CountryList = ({ countries }) => {
  return (
    <ul className="country-list">
      {countries.map((country) => (
        <CountryListing key={country.cca2} country={country}></CountryListing>
      ))}
    </ul>
  );
};

export default CountryList;
