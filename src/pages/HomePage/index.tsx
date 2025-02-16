import { useEffect, useState } from 'react';
import Header from '../../components/Header';
import reactLogo from '../../assets/react.svg';
import Main from '../../components/Main';
import ErrorButton from '../../components/ErrorButton';
import { getItems, ResponseType } from '../../api/getItems';
import Footer from '../../components/Footer';
import { Outlet, useSearchParams } from 'react-router';
import { DEFAULT_PAGE } from '../../constants/constants';
import { useLocalStorage } from '../../hooks/useLocalStorage';
import { useTheme } from '../../hooks/useTheme';
// import { useAppDispatch } from '../../hooks/redux';
import { setSearchParamsToState } from '../../store/slice/serchParamsSlice';
import {
  setPage,
  setQueryParamsToState,
} from '../../store/slice/queryParamsSlice';
import { useAppDispatch } from '../../store/store';
// import { useGetItemsQuery } from '../../api/redux.api';
import { fetchItems } from '../../store/slice/chractersSlice';
import { useSelector } from 'react-redux';
import { charactersSelectors } from '../../store/slice/chractersSelectors';
// import cn from 'classnames';

export default function HomePage() {
  const dispatch = useAppDispatch();

  const { response } = useSelector(charactersSelectors);
  const [inputValue, setInputValue] = useLocalStorage();
  const [data, setData] = useState<ResponseType[] | null>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isError, setIsError] = useState<boolean>(false);
  const [itemsCount, setItemsCount] = useState<number>(0);

  const [searchParams, setSearchParams] = useSearchParams();
  // debugger;
  // const [searchURL, setSearchURL] = useLocalStorage('inputValue');
  const { theme } = useTheme();
  // const {data, meta, links} = useGetItemsQuery(search = 'potter', page = 1);

  useEffect(() => {
    const search = searchParams.get('search') || '';
    const pageStr = searchParams.get('page');
    const page = pageStr ? Number(pageStr) : DEFAULT_PAGE;

    const fetchData = async () => {
      setIsLoading(true);
      setIsError(false);
      try {
        dispatch(fetchItems({ searchParams: search, page }));
        // console.log(characters);
        // const info = await getItems(search, page);
        const info = await getItems(search, page);

        if (info.data && info.meta.pagination?.records) {
          setData(info.data);
          setItemsCount(info.meta.pagination.records);
          console.log(response);
        } else {
          setData([]);
          setItemsCount(0);
        }
      } catch (error) {
        console.error(error);
        setIsError(true);
      }
      setIsLoading(false);
    };

    fetchData();
  }, [searchParams, itemsCount]);

  // const darkModePreference = window.matchMedia('(prefers-color-scheme: dark)');

  // useEffect(() => {
  //   console.log(darkModePreference);
  //   if (theme === 'system') {
  //     if (darkModePreference.matches) {
  //       changeTheme('dark');
  //       console.log(theme);
  //     } else {
  //       changeTheme('light');
  //     }

  //     const handleSystemThemeChange = (e: MediaQueryListEvent) => {
  //       console.log('change');
  //       if (e.matches) {
  //         changeTheme('dark');
  //       } else {
  //         changeTheme('light');
  //       }
  //     };

  //     darkModePreference.addEventListener('change', handleSystemThemeChange);

  //     return () => {
  //       darkModePreference.removeEventListener(
  //         'change',
  //         handleSystemThemeChange
  //       );
  //     };
  //   }

  //   if (theme === 'dark') {
  //     changeTheme('dark');
  //   }

  //   if (theme === 'light') {
  //     changeTheme('light');
  //   }
  // }, [changeTheme, theme]);

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
      {isLoading && (
        <div>
          <p>Loading...</p>
          <img src={reactLogo} className="logo" alt="loading" />
        </div>
      )}
      {isError && <div>Some error occurred. Please try again.</div>}
      {!isLoading && data?.length === 0 && <div>Items not found</div>}
      {data && (
        <div role="homePage" className="main-container">
          <Main items={data} count={itemsCount} onPageChanged={onPageChanged} />
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
