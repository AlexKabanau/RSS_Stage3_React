import { useEffect, useState } from 'react';
import Header from '../../components/Header';
import reactLogo from '../../assets/react.svg';
import Main from '../../components/Main';
import ErrorButton from '../../components/ErrorButton';
import { getItems, ResponseType } from '../../api/getItems';
import Footer from '../../components/Footer';
import { Outlet, useSearchParams } from 'react-router';
import { DEFAULT_PAGE } from '../../constants/constants';

export default function HomePage() {
  const [inputValue, setInputValue] = useState(
    localStorage.getItem('searchValue') || ''
  );
  const [data, setData] = useState<ResponseType[] | null>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isError, setIsError] = useState<boolean>(false);
  const [itemsCount, setItemsCount] = useState<number>(0);

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
        if (info.data && info.meta.pagination?.records) {
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

  const handleOnSubmit = () => {
    localStorage.setItem('searchValue', inputValue);
    setSearchParams({ search: inputValue, page: DEFAULT_PAGE.toString() });
  };

  const onPageChanged = (page: number) => {
    const currentSearch = searchParams.get('search') || inputValue;
    setSearchParams({ search: currentSearch, page: page.toString() });
  };

  return (
    <div className="app" role="mainPage">
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
