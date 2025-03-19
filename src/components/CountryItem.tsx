import React from 'react';
import { Country } from '../redux/slices/countriesSlice';
import './CountryItem.css';

function CountryItem({
  key,
  country,
  isVisited,
  onToggleVisited,
}: {
  key: string;
  country: Country;
  isVisited: boolean;
  onToggleVisited: (name: string) => void;
}) {
  return (
    <div className="country-block">
      <img
        className="country-block__flag"
        src={country.flags.png}
        alt={`Flag of ${country.name.common}`}
      />
      <div className="country-block__info">
        <h4 className="country-block__name">{country.name.common}</h4>
        <label className="country-block__visited-label">
          <input
            type="checkbox"
            checked={isVisited}
            onChange={() => onToggleVisited(country.name.common)}
            className="country-block__visited-checkbox"
          />
          <span className="country-block__visited-text">Visited</span>
        </label>
        <p className="country-block__population">
          Population: {country.population.toLocaleString()}
        </p>
        <p className="country-block__region">Region: {country.region}</p>
      </div>
    </div>
  );
}

export default CountryItem;
