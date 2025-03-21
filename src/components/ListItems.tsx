import React from 'react';
import { Country, Name } from '../redux/slices/countriesSlice';
import CountryItem from './CountryItem';

const ListItems: React.FC<{
  sortedAndFilteredCountries: Country[];
  isVisited: (name: string) => boolean;
  toggleVisited: (name: Name) => void;
}> = ({ sortedAndFilteredCountries, isVisited, toggleVisited }) => {
  return (
    <div className="content__items">
      {sortedAndFilteredCountries?.map((country: Country) => (
        <CountryItem
          key={country.cca3}
          country={country}
          isVisited={isVisited(country.name.common)}
          onToggleVisited={() => toggleVisited(country.name)}
        />
      ))}
    </div>
  );
};

export default React.memo(ListItems);
