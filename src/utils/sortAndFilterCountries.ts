import { Country } from '../redux/slices/countriesSlice';

export const sortAndFilterCountries = (
  countries: Country[],
  sortBy: string,
  order: string,
  filter: string,
  searchValue: string
): Country[] => {
  let filteredCountries = [...countries];

  if (filter !== 'All') {
    filteredCountries = filteredCountries.filter(
      (country) => country.region === filter
    );
  }

  if (searchValue.trim() !== '') {
    const searchRegex = new RegExp(
      searchValue.trim().replace(/\s+/g, '\\s*'),
      'i'
    );
    filteredCountries = filteredCountries.filter((country) =>
      searchRegex.test(country.name.common)
    );
  }

  const sortedCountries = [...filteredCountries];

  if (sortBy === 'name') {
    if (order === 'asc') {
      sortedCountries.sort((a, b) =>
        a.name.common.localeCompare(b.name.common)
      );
    } else {
      sortedCountries.sort((a, b) =>
        b.name.common.localeCompare(a.name.common)
      );
    }
  } else if (sortBy === 'population') {
    if (order === 'asc') {
      sortedCountries.sort((a, b) => a.population - b.population);
    } else {
      sortedCountries.sort((a, b) => b.population - a.population);
    }
  }

  return sortedCountries;
};
