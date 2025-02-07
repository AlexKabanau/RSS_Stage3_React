import { useState } from 'react';
import Header from '../../components/Header';
import reactLogo from '../../assets/react.svg';
import Main from '../../components/Main';
import ErrorButton from '../../components/ErrorButton';
import { getTotalInfo, ResponseType } from '../../api/getItems';
import Footer from '../../components/Footer';
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

  const handleOnSubmit = async () => {
    localStorage.setItem('searchValue', inputValue);
    try {
      setIsLoading(true);
      // const response = await getItems(inputValue);
      // console.log(response);
      const info = await getTotalInfo(inputValue);
      console.log(info);

      if (info.results) {
        setIsLoading(false);
        setIsError(false);
        setItemsCount(info.count);
        setNextPageLink(info.next || '');
        setPrevPageLink(info.previous || '');
        setData(info.results);
      }
    } catch (error) {
      console.error(error);
      setIsLoading(false);
      setIsError(true);
    }
  };
  const onPageChanged = async (page: number) => {
    try {
      setIsLoading(true);
      const info = await getTotalInfo(inputValue, page);
      console.log(info);
      if (info.results) {
        setIsLoading(false);
        setIsError(false);
        setItemsCount(info.count);
        setNextPageLink(info.next || '');
        setPrevPageLink(info.previous || '');
        setData(info.results);
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
      {data?.length === 0 && <div>Items not found</div>}
      {/* TODO Pagination */}
      {data && (
        <Main
          items={data}
          count={itemsCount}
          onPageChanged={onPageChanged}
          // nextPageLink={nextPageLink}
          // prevPageLink={prevPageLink}
        />
      )}
      <div className="error-container">
        <ErrorButton />
      </div>
      <Footer />
    </div>
  );
}
