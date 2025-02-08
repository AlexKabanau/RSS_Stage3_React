import { useState } from 'react';
import Header from '../../components/Header';
import reactLogo from '../../assets/react.svg';
import Main from '../../components/Main';
import ErrorButton from '../../components/ErrorButton';
import { getItems, ResponseType } from '../../api/getItems';
import Footer from '../../components/Footer';
import { Outlet, useSearchParams } from 'react-router';
import { DEFAULT_PAGE } from '../../constants/constants';
// import Footer from '../../components/Footer';import { ResponseType } from './api/getItems';

export default function HomePage() {
  const [inputValue, setInputValue] = useState(
    localStorage.getItem('searchValue') || ''
  );
  const [data, setData] = useState<ResponseType[] | null>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isError, setIsError] = useState<boolean>(false);
  const [itemsCount, setItemsCount] = useState<number>(0);
  // const [nextPageLink, setNextPageLink] = useState<string>('');
  // const [prevPageLink, setPrevPageLink] = useState<string>('');
  // const [page, setPage] = useState<number>(1);

  const [searchParams, setSearchParams] = useSearchParams();

  const handleSearchParams = (inputValue: string, page?: string) => {
    searchParams.set('search', inputValue);
    searchParams.set('page', page || DEFAULT_PAGE.toString());
    setSearchParams(searchParams);
  };

  const handleOnSubmit = async () => {
    localStorage.setItem('searchValue', inputValue);
    try {
      setData([]);
      setIsLoading(true);
      handleSearchParams(inputValue);
      // const response = await getItems(inputValue);
      // console.log(response);
      const info = await getItems(inputValue);
      console.log(info);

      if (info.data) {
        setIsLoading(false);
        setIsError(false);
        setItemsCount(info.meta.pagination.records);
        // setNextPageLink(info.next || '');
        // setPrevPageLink(info.previous || '');
        setData(info.data);
      }
    } catch (error) {
      console.error(error);
      setIsLoading(false);
      setIsError(true);
    }

    // FIXME: refactor!!!!
  };
  const onPageChanged = async (page: number) => {
    try {
      setData([]);
      setIsLoading(true);
      handleSearchParams(inputValue, page.toString());

      const info = await getItems(inputValue, page);
      console.log(info);
      if (info.data) {
        setIsLoading(false);
        setIsError(false);
        setItemsCount(info.meta.pagination.records);
        // setNextPageLink(info.next || '');
        // setPrevPageLink(info.previous || '');
        setData(info.data);
      }
    } catch (error) {
      console.error(error);
      setIsLoading(false);
      setIsError(true);
    }
  };

  // const handleResponse = (data: ResponseType[]) => {
  //   setData(data);
  // };

  // const setIsLoading = (isLoading: boolean) => {
  //   setIsLoading(isLoading);
  // };

  // const setIsError = (isError: boolean) => {
  //   setIsError(isError);
  // };

  // const setData = (data: ResponseType[]) => {
  //   setData(data);
  // };

  return (
    <div className="app">
      <Header
        inputValue={inputValue}
        setInputValue={setInputValue}
        // handleResponse={setData}
        // setIsLoading={setIsLoading}
        // setIsError={setIsError}
        // setItemsCount={setItemsCount}
        // setNextPageLink={setNextPageLink}
        // setPrevPageLink={setPrevPageLink}
        handleOnSubmit={handleOnSubmit}
      />
      {isLoading && (
        <div>
          <p>Loading...</p>
          <img src={reactLogo} className="logo" alt="loading" />
        </div>
      )}
      {/* count: {itemsCount} */}
      {isError && <div>Some error occurred. Please try again.</div>}
      {!isLoading && data?.length === 0 && <div>Items not found</div>}
      {data && (
        <div className="main-container">
          <Main
            items={data}
            count={itemsCount}
            // currentPage={DEFAULT_PAGE}
            onPageChanged={onPageChanged}
            // nextPageLink={nextPageLink}
            // prevPageLink={prevPageLink}
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
