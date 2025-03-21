import { useCallback, useEffect, useMemo } from 'react';
import Search from '../components/Search';
import { FilterPropertyEnum, selectFilter } from '../redux/slices/filterSlice';
import { useAppDispatch } from '../redux/store';
import { useSelector } from 'react-redux';
import { Country, Name } from '../redux/slices/countriesSlice';
import reactLogo from '../assets/react.svg';
import { useGetAllCountriesQuery } from '../redux/redux.api';
import Categories from '../components/Categories';
import Sort from '../components/Sort';
import './HomePage.css';
import { sortAndFilterCountries } from '../utils/sortAndFilterCountries';
import { selectVisited, setVisited } from '../redux/slices/visitedSlice';
import ListItems from '../components/ListItems';

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

  const isVisited = (name: string) =>
    visited.visited.some((item) => item.common === name);

  const toggleVisited = useCallback(
    (item: Name) => {
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

  useEffect(() => {
    const storedVisited = localStorage.getItem('visitedCountries');
    if (storedVisited) {
      dispatch(setVisited(JSON.parse(storedVisited)));
    }
  }, [dispatch]);

  useEffect(() => {
    localStorage.setItem('visitedCountries', JSON.stringify(visited.visited));
  }, [visited]);

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
        <Categories value={categoryId} />
        <Search />
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
        <div>Items not found</div>
      )}
    </div>
  );
}

export default HomePage;
