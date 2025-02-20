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
import { useSelector } from 'react-redux';
import { queryParamsSelectors } from '../../store/slice/queryParamsSelectors';
import { favoritsSelectors } from '../../store/slice/favoritsSelectors';
import { ArrowDownToLine, Trash2 } from 'lucide-react';
import { clearFavorits } from '../../store/slice/favoritsSlice';

import { useDownloadCSV } from '../../hooks/downloadItemsCSV';

import { useToast } from '../../components/ToastContext';
import { useGetCharactersQuery } from '../../api/redux.api';

export default function HomePage() {
  const dispatch = useAppDispatch();
  const { addToast } = useToast();

  const { page, search } = useSelector(queryParamsSelectors);
  const [inputValue, setInputValue] = useLocalStorage();
  const [searchParams, setSearchParams] = useSearchParams();
  const { theme } = useTheme();
  const favorits = useSelector(favoritsSelectors);

  const {
    data: response,
    error,
    isFetching,
    refetch,
  } = useGetCharactersQuery(
    { searchParams: search, page: Number(page) },
    { refetchOnMountOrArgChange: true }
  );
  const downloadCSV = useDownloadCSV();

  useEffect(() => {
    refetch();
  }, [search, page, refetch]);

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
  };

  const onPageChanged = (page: number) => {
    dispatch(setPage(page.toString()));
    dispatch(setSearchParamsToState(inputValue));

    const currentSearch = searchParams.get('search') || inputValue;
    setSearchParams({ search: currentSearch, page: page.toString() });
  };
  const onDeleteIconClick = () => {
    dispatch(clearFavorits());
    addToast('Successfully deleted all characters!');
  };
  const onDownloadIconClick = () => {
    if (!response || !response.data || response.data.length === 0) {
      addToast('Нет данных для загрузки!');
      return;
    }
    downloadCSV();
  };

  return (
    <div className={theme === 'dark' ? 'app dark' : 'app'} role="mainPage">
      <Header
        inputValue={inputValue}
        setInputValue={setInputValue}
        handleOnSubmit={handleOnSubmit}
      />
      {isFetching && (
        <div>
          <p>Loading...</p>
          <img src={reactLogo} className="logo" alt="loading" />
        </div>
      )}
      {error && <div>Some error occurred. Please try again.</div>}
      {response?.data?.length === 0 && <div>Items not found</div>}
      {favorits.length > 0 && (
        <p className="favorits">
          Favorits: {favorits.length}
          <button
            className={'favoritButton'}
            aria-label="Trash"
            onClick={onDeleteIconClick}
          >
            <Trash2 size={15} />
          </button>
          <button
            className={'favoritButton'}
            onClick={onDownloadIconClick}
            aria-label="Download"
          >
            <ArrowDownToLine size={15} cursor={'pointer'} />
          </button>
        </p>
      )}
      {response?.data && (
        <div role="homePage" className="main-container">
          <Main
            className={response.data.length ? 'fullWidth' : 'width2_3'}
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
