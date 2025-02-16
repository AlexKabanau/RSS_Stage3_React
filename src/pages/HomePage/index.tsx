import { useEffect } from 'react';
import Header from '../../components/Header';
import reactLogo from '../../assets/react.svg';
import Main from '../../components/Main';
import ErrorButton from '../../components/ErrorButton';
import Footer from '../../components/Footer';
import { Outlet, useSearchParams } from 'react-router';
import { DEFAULT_PAGE } from '../../constants/constants';
import { useLocalStorage } from '../../hooks/useLocalStorage';
import { useTheme } from '../../hooks/useTheme';
import { setSearchParamsToState } from '../../store/slice/serchParamsSlice';
import {
  setPage,
  setQueryParamsToState,
} from '../../store/slice/queryParamsSlice';
import { useAppDispatch } from '../../store/store';
import { fetchItems } from '../../store/slice/chractersSlice';
import { useSelector } from 'react-redux';
import { charactersSelectors } from '../../store/slice/chractersSelectors';
import { queryParamsSelectors } from '../../store/slice/queryParamsSelectors';

export default function HomePage() {
  const dispatch = useAppDispatch();

  const { response, status } = useSelector(charactersSelectors);
  const { page, search } = useSelector(queryParamsSelectors);
  const [inputValue, setInputValue] = useLocalStorage();
  const [searchParams, setSearchParams] = useSearchParams();
  const { theme } = useTheme();

  useEffect(() => {
    dispatch(fetchItems({ searchParams: search, page: Number(page) }));
  }, [search, page, dispatch]);

  const handleOnSubmit = () => {
    setInputValue(inputValue);
    dispatch(setSearchParamsToState(inputValue));
    dispatch(
      setQueryParamsToState({
        search: inputValue,
        page: DEFAULT_PAGE.toString(),
      })
    );

    setSearchParams({ search: inputValue, page: DEFAULT_PAGE.toString() });
    console.log(inputValue);
  };

  const onPageChanged = (page: number) => {
    dispatch(setPage(page.toString()));
    dispatch(setSearchParamsToState(inputValue));

    const currentSearch = searchParams.get('search') || inputValue;
    setSearchParams({ search: currentSearch, page: page.toString() });
  };

  return (
    <div className={theme === 'dark' ? 'app dark' : 'app'} role="mainPage">
      <Header
        inputValue={inputValue}
        setInputValue={setInputValue}
        handleOnSubmit={handleOnSubmit}
      />
      {status === 'loading' && (
        <div>
          <p>Loading...</p>
          <img src={reactLogo} className="logo" alt="loading" />
        </div>
      )}
      {status === 'error' && <div>Some error occurred. Please try again.</div>}
      {status === 'success' && response.data?.length === 0 && (
        <div>Items not found</div>
      )}
      {response.data && (
        <div role="homePage" className="main-container">
          <Main
            items={response.data}
            count={response.meta.pagination?.records || 0}
            onPageChanged={onPageChanged}
          />
          <Outlet />
        </div>
      )}
      <div className="error-container">
        <ErrorButton />
      </div>
      <Footer />
    </div>
  );
}
