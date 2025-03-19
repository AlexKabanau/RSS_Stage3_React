import { Country } from '../redux/slices/countriesSlice';
// import { SortPropertyEnum } from '../redux/slices/filterSlice';

export const sortAndFilterCountries = (
  countries: Country[],
  sortBy: string,
  order: string, //'asc' | 'desc',
  filter: string, //Region | 'All'
  searchValue: string
): Country[] => {
  // 1. Filter
  let filteredCountries = [...countries];

  if (filter !== 'All') {
    filteredCountries = filteredCountries.filter(
      (country) => country.region === filter
    );
  }

  //search Filter
  if (searchValue.trim() !== '') {
    const searchRegex = new RegExp(
      searchValue.trim().replace(/\s+/g, '\\s*'),
      'i'
    );
    filteredCountries = filteredCountries.filter((country) =>
      searchRegex.test(country.name.common)
    );
  }

  // 2. Sort
  const sortedCountries = [...filteredCountries];

  if (sortBy === 'name') {
    // console.log('sortBy function ', sortBy);
    if (order === 'asc') {
      // console.log('sort name ', order);
      sortedCountries.sort((a, b) =>
        a.name.common.localeCompare(b.name.common)
      );
    } else {
      // console.log('sort name ', order);
      sortedCountries.sort((a, b) =>
        b.name.common.localeCompare(a.name.common)
      );
    }
  } else if (sortBy === 'population') {
    if (order === 'asc') {
      // console.log('sort population ', order);

      sortedCountries.sort((a, b) => a.population - b.population);
    } else {
      // console.log('sort population ', order);

      sortedCountries.sort((a, b) => b.population - a.population);
    }
  }

  // 3. Order (if needed, but it's already handled in the sort logic above)
  // if (order === 'desc') {
  //   sortedCountries.reverse();
  // }
  // console.log(sortedCountries);
  return sortedCountries;
};
/* import React from 'react';
import CountryItem from '../components/CountryItem';
import Search from '../components/Search';
import {
  selectFilter,
  selectSort,
  setSort,
  SortPropertyEnum,
} from '../redux/slices/filterSlice';
import { useAppDispatch, useAppSelector } from '../redux/store';
import {
  Country,
  fetchCountries,
  selectCountriesData,
  Region,
} from '../redux/slices/countriesSlice';
import { useGetAllCountriesQuery } from '../redux/redux.api';
import Categories from '../components/Categories';
import Sort from '../components/Sort';
import './HomePage.css';
import { sortAndFilterCountries } from '../utils/sortAndFilterCountries';

function HomePage() {
  const { data, error, isFetching, refetch } = useGetAllCountriesQuery('');
  const dispatch = useAppDispatch();
  const countries = useAppSelector((state) => state.countries.items);
  const sortBy = useAppSelector((state) => state.filter.sort.sortProperty);
  const order = useAppSelector((state) => state.filter.sort.order);
  const filter = useAppSelector((state) => state.filter.filter);

  const sortedAndFilteredCountries = sortAndFilterCountries(
    data || [],
    sortBy,
    order,
    filter
  );

  if (isFetching) {
    return <div className="loading">Loading...</div>;
  }
  if (error) {
    return <div className="error">Error: {JSON.stringify(error)}</div>;
  }

  return (
    <div>
      <div className="content__top">
        
        <Categories />
        
        <Search />
        
        <Sort />
      </div>
      <h2 className="content__title">Countries</h2>
      {isFetching ? (
        <div>Loading...</div>
      ) : (
        <div className="content__items">
          {sortedAndFilteredCountries.map((country: Country) => (
            <CountryItem key={country.cca3} country={country} />
          ))}
        </div>
      )}
    </div>
  );
}

export default HomePage;
  */

/* import { configureStore } from '@reduxjs/toolkit';
// import favorits from './slice/favoritsSlice';
import filter from './slices/filterSlice';
import countries from './slices/countriesSlice';

import { useDispatch } from 'react-redux';
import { countriesApi } from './redux.api';
// import { api } from '../api/redux.api';

export const store = configureStore({
  reducer: {
    filter: filter,
    countries: countries,
    // favorits: favorits,
    [countriesApi.reducerPath]: countriesApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ serializableCheck: false }).concat(
      countriesApi.middleware
    ),
  // middleware: (getDefaultMiddleware) =>
  // getDefaultMiddleware().concat(countriesApi.middleware),
});

export type RootStateType = ReturnType<typeof store.getState>;
export type AppStoreType = typeof store;
export type AppDispatchType = typeof store.dispatch;
export const useAppDispatch = () => useDispatch<AppDispatchType>();
export const useAppSelector: TypedUseSelectorHook<RootStateType> = useSelector;
  */

/* import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootStateType } from '../store';
import { Region } from './countriesSlice';
import { TypedUseSelectorHook, useSelector } from 'react-redux';

export enum SortPropertyEnum {
  POPULATION_DESC = 'population',
  POPULATION_ASC = 'population-asc',
  NAME_DESC = 'name',
  NAME_ASC = 'name-asc',
}

export type Sort = {
  sortProperty: SortPropertyEnum;
  order: 'asc' | 'desc';
};

interface FilterSliceState {
  filter: Region | 'All';
  sort: Sort;
}

const initialState: FilterSliceState = {
  filter: 'All',
  sort: {
    sortProperty: SortPropertyEnum.NAME_ASC,
    order: 'asc',
  },
};

export const filterSlice = createSlice({
  name: 'filter',
  initialState,
  reducers: {
    setFilter: (state, action: PayloadAction<Region | 'All'>) => {
      state.filter = action.payload;
    },
    setSort: (state, action: PayloadAction<Sort>) => {
      state.sort = action.payload;
    },
  },
});

export const selectFilter = (state: RootStateType) => state.filter;
export const selectSort = (state: RootStateType) => state.filter.sort;

export const { setFilter, setSort } = filterSlice.actions;

export default filterSlice.reducer;
  */

///////////////////////////////////////////

/* import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../store/store';
import './MainPage.css';
import Item from '../components/Item';
import { setShadow } from '../store/reducers/dataSlice';

function MainPage() {
  const data = useAppSelector((state) => state.data);
  const dispatch = useAppDispatch();
  useEffect(() => {
    if (data.length) {
      const timeoutId = setTimeout(() => {
        dispatch(setShadow(''));
      }, 3000);
      return () => clearTimeout(timeoutId);
    }
  }, [data, dispatch]);
  return (
    <div className="main-page">
      <p className="main-page-title">Types of form:</p>
      <nav className="main-page-nav">
        <Link to={'/hookForm'} className="navLink">
          HookForm
        </Link>
        <Link to={'/uncontrollerForm'} className="navLink">
          Uncontrolled Form
        </Link>
      </nav>
      <div className="data-container">
        {data.length ? (
          data.map((item, i) => {
            const hightLightIndex = data.length - 1;
            return (
              <Item item={item} key={i} i={i} highlight={hightLightIndex} />
            );
          })
        ) : (
          <div className="empty-state">
            <p>Items not fond</p>
            <p>Please choose type of form</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default MainPage;
 */
