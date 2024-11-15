import weather from "../services/weather";
import { useEffect, useState } from "react";

const CountryDetails = ({ country }) => {
  const [iconUrl, setIconUrl] = useState(null)

  useEffect(() => {
    weather.getWeatherIconCode(country.capital)
    .then(iconCode => setIconUrl(`https://openweathermap.org/img/wn/${iconCode}@2x.png`))
    .catch(e => console.log(e.message))
  }, [])

  const languages = [];

  for (const [key, value] of Object.entries(country.languages)) {
    languages.push(value);
  }

  return (
    <div className="country-details">
      <h2>{country.name.official}</h2>
      <div>
        <p>capital {country.capital}</p>
        <p>area {country.area}</p>
      </div>
      <h3>Languages</h3>
      <ul className="languages-list">
        {languages.map((lang) => (
          <li key={lang}>{lang}</li>
        ))}
      </ul>
      <img src={country.flags.png} alt={country.flags.alt} className="flag"/>
      {iconUrl && <img className="weather-icon" src={iconUrl} alt="current weather icon"></img>}
    </div>
  );
};

export default CountryDetails;
