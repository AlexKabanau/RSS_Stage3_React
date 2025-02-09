import { useEffect, useState } from 'react';
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

  useEffect(() => {
    const search = searchParams.get('search') || '';
    const pageStr = searchParams.get('page');
    const page = pageStr ? Number(pageStr) : DEFAULT_PAGE;

    const fetchData = async () => {
      setIsLoading(true);
      setIsError(false);
      try {
        const info = await getItems(search, page);
        console.log(info);
        if (info.data) {
          setData(info.data);
          setItemsCount(info.meta.pagination.records);
        } else {
          setData([]);
        }
      } catch (error) {
        console.error(error);
        setIsError(true);
      }
      setIsLoading(false);
    };

    fetchData();
  }, [searchParams]);

  // Обработчик для кнопки Search (обновляем URL-параметры, сбрасывая страницу на DEFAULT_PAGE)
  const handleOnSubmit = () => {
    localStorage.setItem('searchValue', inputValue);
    setSearchParams({ search: inputValue, page: DEFAULT_PAGE.toString() });
  };

  // Обработчик для смены страницы
  // Берёт значение поиска из searchParams (если оно там уже есть) или из inputValue
  const onPageChanged = (page: number) => {
    const currentSearch = searchParams.get('search') || inputValue;
    setSearchParams({ search: currentSearch, page: page.toString() });
  };
  // const handleSearchParams = useCallback(
  //   (inputValue: string, page?: string) => {
  //     // Создаём новый объект, чтобы избежать мутирования searchParams
  //     const params = new URLSearchParams(searchParams);
  //     params.set('search', inputValue);
  //     params.set('page', page || DEFAULT_PAGE.toString());
  //     setSearchParams(params);
  //   },
  //   [searchParams, setSearchParams]
  // );

  // const handleOnSubmit = useCallback(async () => {
  //   localStorage.setItem('searchValue', inputValue);
  //   debugger;
  //   try {
  //     setData([]);
  //     setIsLoading(true);
  //     handleSearchParams(inputValue);

  //     const info = await getItems(inputValue);
  //     console.log(info);

  //     if (info.data) {
  //       setIsLoading(false);
  //       setIsError(false);
  //       setItemsCount(info.meta.pagination.records);
  //       setData(info.data);
  //     }
  //   } catch (error) {
  //     console.error(error);
  //     setIsLoading(false);
  //     setIsError(true);
  //   }
  // }, [inputValue, handleSearchParams]);
  // Если требуется первоначальная загрузка данных при монтировании:
  // useEffect(() => {
  //   handleOnSubmit();
  // }, [handleOnSubmit]);
  // const onPageChanged = useCallback(
  //   async (page: number) => {
  //     try {
  //       setData([]);
  //       setIsLoading(true);
  //       handleSearchParams(inputValue, page.toString());

  //       const info = await getItems(inputValue, page);
  //       console.log(info);
  //       if (info.data) {
  //         setIsLoading(false);
  //         setIsError(false);
  //         setItemsCount(info.meta.pagination.records);
  //         setData(info.data);
  //       }
  //     } catch (error) {
  //       console.error(error);
  //       setIsLoading(false);
  //       setIsError(true);
  //     }
  //   },
  //   [inputValue, handleSearchParams]
  // );

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
