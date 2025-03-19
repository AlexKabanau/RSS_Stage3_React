import { useEffect, useState } from 'react';
// import CountryBlock from '../components/CountryItem';
import Search from '../components/Search';
import { selectFilter } from '../redux/slices/filterSlice';
import { useAppDispatch } from '../redux/store';
import { useSelector } from 'react-redux';
import {
  Country,
  // fetchCountries,
  Name,
  // selectCountriesData,
} from '../redux/slices/countriesSlice';
import reactLogo from '../assets/react.svg';
import { useGetAllCountriesQuery } from '../redux/redux.api';
import Categories from '../components/Categories';
import Sort from '../components/Sort';
import CountryItem from '../components/CountryItem';
import './HomePage.css';
import { sortAndFilterCountries } from '../utils/sortAndFilterCountries';
import { selectVisited, setVisited } from '../redux/slices/visitedSlice';

// export enum SortPropertyEnum {
//   POPULATION_DESC = 'population',
//   POPULATION_ASC = '-population',
//   NAME_DESC = 'name',
//   NAME_ASC = '-name',
// }

function HomePage() {
  const dispatch = useAppDispatch();
  const { categoryId, sort, searchValue } = useSelector(selectFilter);
  const visited = useSelector(selectVisited);
  // console.log('visited =>', visited);
  const isVisited = (name: string) =>
    visited.visited.some((item) => item.common === name);

  const { data, error, isFetching } = useGetAllCountriesQuery('');
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
    const storedVisited = localStorage.getItem('visitedCountries');
    if (storedVisited) {
      dispatch(setVisited(JSON.parse(storedVisited)));
    }
  }, [dispatch]);
  useEffect(() => {
    // console.log('sortBy =>', sortBy);
    // console.log('order =>', order);
    // console.log('filter =>', filter);
    // console.log('searchValue =>', searchValue);

    setSortedAndFilteredCountries(
      sortAndFilterCountries(data || [], sortBy, order, filter, searchValue)
    );
    // console.log(sortedAndFilteredCountries?.length);
  }, [sortBy, order, filter, data, searchValue]);

  useEffect(() => {
    localStorage.setItem('visitedCountries', JSON.stringify(visited.visited));
  }, [visited]);

  const toggleVisited = (item: Name) => {
    // console.log(item);
    // if (!Array.isArray(visited)) {
    //   console.error('visited is not an array!');
    //   return;
    // }

    const updatedVisit = isVisited(item.common)
      ? visited.visited.filter((country) => country.common !== item.common)
      : [...visited.visited, item];

    dispatch(setVisited(updatedVisit));
  };
  if (error) {
    return <div className="error">Error: {JSON.stringify(error)}</div>;
  }

  return (
    <div className="main">
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
        <>
          <p>⏳ Loading...</p>
          <img src={reactLogo} className="logo" alt="loading" />
        </>
      ) : sortedAndFilteredCountries && sortedAndFilteredCountries.length ? (
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
      ) : (
        <div>Items not found</div>
      )}
    </div>
  );
}

export default HomePage;
