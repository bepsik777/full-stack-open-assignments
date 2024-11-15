const CountryDetails = ({ country }) => {
  const languages = [];

  for (const [key, value] of Object.entries(country.languages)) {
    languages.push(value);
  }

  return (
    <div>
      <h2>{country.name.official}</h2>
      <div>
        <p>capital {country.capital}</p>
        <p>area {country.area}</p>
      </div>
      <h3>Languages</h3>
      <ul>
        {languages.map((lang) => (
          <li key={lang}>{lang}</li>
        ))}
      </ul>
      <img src={country.flags.png} alt={country.flags.alt} />
    </div>
  );
};

export default CountryDetails;
