import { useState } from 'react';
import Header from '../../components/Header';
import reactLogo from '../../assets/react.svg';
import Main from '../../components/Main';
import ErrorButton from '../../components/ErrorButton';
import { ResponseType } from '../../api/getItems';
import Footer from '../../components/Footer';
// import Footer from '../../components/Footer';import { ResponseType } from './api/getItems';

export default function HomePage() {
  const [data, setData] = useState<ResponseType[] | null>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isError, setIsError] = useState<boolean>(false);

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
        handleResponse={setData}
        setIsLoading={setIsLoading}
        setIsError={setIsError}
      />
      {isLoading && (
        <div>
          <p>Loading...</p>
          <img src={reactLogo} className="logo" alt="loading" />
        </div>
      )}
      {isError && <div>Some error occurred. Please try again.</div>}
      {data?.length === 0 && <div>Items not found</div>}
      {/* TODO Pagination */}
      {data && <Main items={data} />}
      <div className="error-container">
        <ErrorButton />
      </div>
      <Footer />
    </div>
  );
}
