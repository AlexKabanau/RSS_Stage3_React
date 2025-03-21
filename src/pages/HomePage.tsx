import { useCallback, useEffect, useMemo } from 'react';
// import CountryBlock from '../components/CountryItem';
import Search from '../components/Search';
import { FilterPropertyEnum, selectFilter } from '../redux/slices/filterSlice';
import { useAppDispatch } from '../redux/store';
import { useSelector } from 'react-redux';
import {
  Country,
  // Country,
  // fetchCountries,
  Name,
  // selectCountriesData,
} from '../redux/slices/countriesSlice';
import reactLogo from '../assets/react.svg';
import { useGetAllCountriesQuery } from '../redux/redux.api';
import Categories from '../components/Categories';
import Sort from '../components/Sort';
// import CountryItem from '../components/CountryItem';
import './HomePage.css';
import { sortAndFilterCountries } from '../utils/sortAndFilterCountries';
import { selectVisited, setVisited } from '../redux/slices/visitedSlice';
import ListItems from '../components/ListItems';
import React from 'react';

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

  const { data, error, isFetching } = useGetAllCountriesQuery('');

  const sortBy = sort.sortProperty.replace('-', '');
  const order: 'asc' | 'desc' = sort.sortProperty.includes('-')
    ? `asc`
    : `desc`;
  const filter = categoryId.filterProperty;

  // const [sortedAndFilteredCountries, setSortedAndFilteredCountries] = useState<
  //   Country[] | undefined
  // >(data);

  const sortAndFilterCountriesCallback = useCallback(
    (
      data: Country[] | [],
      sortBy: string,
      order: 'asc' | 'desc',
      filter: FilterPropertyEnum,
      searchValue: string
    ) => {
      return sortAndFilterCountries(data, sortBy, order, filter, searchValue);
    },
    []
  );
  const sortedAndFilteredCountries = useMemo(
    () =>
      sortAndFilterCountriesCallback(
        data || [],
        sortBy,
        order,
        filter,
        searchValue
      ),
    [data, sortBy, order, filter, searchValue, sortAndFilterCountriesCallback]
  );

  // const isVisited = (name: string) =>
  //   visited.visited.some((item) => item.common === name);

  const isVisited = (name: string) =>
    visited.visited.some((item) => item.common === name);

  const toggleVisited = useCallback(
    (item: Name) => {
      // (item: { common: string }) => {

      dispatch(
        setVisited(
          isVisited(item.common)
            ? visited.visited.filter(
                (country) => country.common !== item.common
              )
            : [...visited.visited, item]
        )
      );
    },
    [dispatch, visited]
  );

  // const toggleVisited = useCallback(
  //   (item: { common: string }) => {
  //     const updatedVisit = isVisited(item.common)
  //       ? visited.visited.filter((country) => country.common !== item.common)
  //       : [...visited.visited, item];

  //     dispatch(setVisited(updatedVisit));
  //   },
  //   [dispatch, isVisited, visited]
  // );
  useEffect(() => {
    const storedVisited = localStorage.getItem('visitedCountries');
    if (storedVisited) {
      dispatch(setVisited(JSON.parse(storedVisited)));
    }
  }, [dispatch]);

  useEffect(() => {
    localStorage.setItem('visitedCountries', JSON.stringify(visited.visited));
  }, [visited]);

  // useEffect(() => {
  //   // console.log('sortBy =>', sortBy);
  //   // console.log('order =>', order);
  //   // console.log('filter =>', filter);
  //   // console.log('searchValue =>', searchValue);

  //   setSortedAndFilteredCountries(
  //     sortAndFilterCountries(data || [], sortBy, order, filter, searchValue)
  //   );
  //   // console.log(sortedAndFilteredCountries?.length);
  // }, [sortBy, order, filter, data, searchValue]);

  if (error) {
    return (
      <div className="error">
        <h2>Произошла ошибка</h2>
        <p>{error instanceof Error ? error.message : 'Неизвестная ошибка'}</p>
      </div>
    );
  }
  return (
    <div className="main">
      <div className="content__top">
        {/* NEW FILTER */}
        <Categories value={categoryId} />
        {/* SEARCH */}
        <Search />
        {/* SORT */}
        <Sort value={sort} />
      </div>
      <h2 className="content__title">Countries</h2>
      {isFetching ? (
        <>
          <p>⏳ Loading...</p>
          <img src={reactLogo} className="logo" alt="loading" />
        </>
      ) : sortedAndFilteredCountries && sortedAndFilteredCountries.length ? (
        <ListItems
          sortedAndFilteredCountries={sortedAndFilteredCountries}
          isVisited={isVisited}
          toggleVisited={toggleVisited}
        />
      ) : (
        // <div className="content__items">
        //   {sortedAndFilteredCountries?.map((country: Country) => (
        //     <CountryItem
        //       key={country.cca3}
        //       country={country}
        //       isVisited={isVisited(country.name.common)}
        //       onToggleVisited={() => toggleVisited(country.name)}
        //     />
        //   ))}
        // </div>
        <div>Items not found</div>
      )}
    </div>
  );
}
// const MemoizedListItems = React.memo(ListItems);

export default HomePage;
