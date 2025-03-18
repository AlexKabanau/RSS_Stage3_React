import React, { useEffect, useRef, useState } from 'react';
import CountryBlock from '../components/CountryItem';
import Search from '../components/Search';
import { selectFilter, selectSort, setSort } from '../redux/slices/filterSlice';
import { useAppDispatch } from '../redux/store';
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

// export enum SortPropertyEnum {
//   POPULATION_DESC = 'population',
//   POPULATION_ASC = '-population',
//   NAME_DESC = 'name',
//   NAME_ASC = '-name',
// }

function HomePage() {
  // const dispatch = useAppDispatch();
  const { data, error, isFetching, refetch } = useGetAllCountriesQuery('');
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
      ) : (
        <div className="content__items">
          {data?.map((country: Country) => (
            <CountryItem key={country.cca3} country={country} />
          ))}
        </div>
      )}
    </div>
  );
}

export default HomePage;
