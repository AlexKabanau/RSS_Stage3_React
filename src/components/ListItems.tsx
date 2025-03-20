import React from 'react';
import { Country, Name } from '../redux/slices/countriesSlice';
import CountryItem from './CountryItem';

function ListItems({
  sortedAndFilteredCountries,
  isVisited,
  toggleVisited,
}: {
  sortedAndFilteredCountries: Country[];
  isVisited: (name: string) => boolean;
  toggleVisited: (name: Name) => void;
}) {
  console.log(sortedAndFilteredCountries.length);
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
}

export default ListItems;
