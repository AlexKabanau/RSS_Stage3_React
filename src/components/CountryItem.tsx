// import React from 'react';
import React from 'react';
import { Country } from '../redux/slices/countriesSlice';
import './CountryItem.css';
// import { useWhyDidYouUpdate } from 'ahooks';

type CountryItemPropsType = {
  country: Country;
  isVisited: boolean;
  onToggleVisited: (name: string) => void;
};
const CountryItem: React.FC<CountryItemPropsType> = ({
  // key,
  country,
  isVisited,
  onToggleVisited,
}) => {
  // console.log(`Rendering ${country.name.common}`); // для отладки
  // useWhyDidYouUpdate('Categories', { value, onChangeCategory })
  return (
    <div className="country-block">
      <img
        className="country-block__flag"
        src={country.flags.png}
        alt={`Flag of ${country.name.common}`}
      />
      <div className="country-block__info">
        <h4 className="country-block__name">{country.name.common}</h4>
        {/* <label className="country-block__visited-label">
          <input
            type="checkbox"
            checked={isVisited}
            onChange={() => onToggleVisited(country.name.common)}
            className="country-block__visited-checkbox"
          />
          <span className="country-block__visited-text">Visited</span>
        </label> */}
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
