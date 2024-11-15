import { useState } from "react";
import CountryDetails from "./CountryDetails";

const CountryListing = ({ country }) => {
  const [isShown, setIsShown] = useState(false);

  return (
    <li>
      <div className="listing-text">
        <p>{country.name.common}</p>
        <button onClick={() => setIsShown(!isShown)}>
          {isShown ? "hide" : "show"}
        </button>
      </div>
      {isShown && <CountryDetails country={country}></CountryDetails>}
    </li>
  );
};

export default CountryListing;
