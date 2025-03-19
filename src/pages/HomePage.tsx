import React, { useEffect, useRef, useState } from 'react';
import CountryBlock from '../components/CountryItem';
import Search from '../components/Search';
import { selectFilter, selectSort, setSort } from '../redux/slices/filterSlice';
import { useAppDispatch, useAppSelector } from '../redux/store';
import { useSelector } from 'react-redux';
import {
  Country,
  fetchCountries,
  selectCountriesData,
} from '../redux/slices/countriesSlice';
import { useGetAllCountriesQuery } from '../redux/redux.api';
import Categories from '../components/Categories';
import Sort from '../components/Sort';
import CountryItem from '../components/CountryItem';
import './HomePage.css';
import { sortAndFilterCountries } from '../utils/sortAndFilterCountries';

// export enum SortPropertyEnum {
//   POPULATION_DESC = 'population',
//   POPULATION_ASC = '-population',
//   NAME_DESC = 'name',
//   NAME_ASC = '-name',
// }

function HomePage() {
  // const dispatch = useAppDispatch();
  const { categoryId, sort, searchValue } = useSelector(selectFilter);

  const { data, error, isFetching, refetch } = useGetAllCountriesQuery('');
  const sortBy = sort.sortProperty.replace('-', '');
  const order = sort.sortProperty.includes('-') ? `asc` : `desc`;
  const filter = categoryId.filterProperty;
  const [sortedAndFilteredCountries, setSortedAndFilteredCountries] = useState<
    Country[] | undefined
  >(data);
  // const sortBy = useAppSelector((state) => state.filter.sort.sortProperty);
  // const order = useAppSelector((state) => state.filter.sort.name);
  // const filter = useAppSelector((state) => state.filter.categoryId);
  // let sortedAndFilteredCountries = data;
  useEffect(() => {
    setSortedAndFilteredCountries(
      sortAndFilterCountries(data || [], sortBy, order, filter, searchValue)
    );
    console.log('sortBy =>', sortBy);
    console.log('order =>', order);
    console.log('filter =>', filter);
    console.log('searchValue =>', searchValue);
    console.log(sortedAndFilteredCountries?.length);
  }, [sortBy, order, filter, data, searchValue]);

  if (isFetching) {
    return <div className="loading">Loading...</div>;
  }
  if (error) {
    return <div className="error">Error: {JSON.stringify(error)}</div>;
  }

  return (
    <div>
      <div className="content__top">
        {/* NEW FILTER */}
        <Categories />
        {/* SEARCH */}
        <Search />
        {/* SORT */}
        <Sort />
      </div>
      <h2 className="content__title">Countries</h2>
      {isFetching ? (
        <div>Loading...</div>
      ) : sortedAndFilteredCountries && sortedAndFilteredCountries.length ? (
        <div className="content__items">
          {sortedAndFilteredCountries?.map((country: Country) => (
            <CountryItem key={country.cca3} country={country} />
          ))}
        </div>
      ) : (
        <div>Items not found</div>
      )}
    </div>
  );
}

export default HomePage;
