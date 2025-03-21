import React from 'react';
import { Country } from '../redux/slices/countriesSlice';
import './CountryItem.css';

type CountryItemPropsType = {
  country: Country;
  isVisited: boolean;
  onToggleVisited: (name: string) => void;
};
const CountryItem: React.FC<CountryItemPropsType> = ({
  country,
  isVisited,
  onToggleVisited,
}) => {
  return (
    <div className="country-block">
      <img
        className="country-block__flag"
        src={country.flags.png}
        alt={`Flag of ${country.name.common}`}
      />
      <div className="country-block__info">
        <h4 className="country-block__name">{country.name.common}</h4>

        <p className="country-block__population">
          Population: {country.population.toLocaleString()}
        </p>
        <p className="country-block__region">Region: {country.region}</p>
        <button onClick={() => onToggleVisited(country.name.common)}>
          {isVisited ? '✅ Visited' : '📍 Mark as Visited'}
        </button>
      </div>
    </div>
  );
};

export default React.memo(
  CountryItem,
  (prevProps, nextProps) => prevProps.isVisited === nextProps.isVisited
);
