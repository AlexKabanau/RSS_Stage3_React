import { useEffect } from 'react';
import styles from './Header.module.css';
// import { getItems, getTotalInfo, ResponseType } from '../api/getItems';

type HeaderPropsType = {
  // handleResponse: (data: ResponseType[]) => void;
  // setIsLoading: (isLoading: boolean) => void;
  // setIsError: (isError: boolean) => void;
  // setItemsCount: (itemsCount: number) => void;
  // setNextPageLink: (nextPageLink: string) => void;
  // setPrevPageLink: (prevPageLink: string) => void;
  handleOnSubmit: () => void;
  inputValue: string;
  setInputValue: (value: string) => void;
};

import React from 'react';

const Header: React.FC<HeaderPropsType> = ({
  // handleResponse,
  // setIsError,
  // setIsLoading,
  // setItemsCount,
  // setNextPageLink,
  // setPrevPageLink,
  handleOnSubmit,
  inputValue,
  setInputValue,
}) => {
  const handleOnChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
    localStorage.setItem('searchValue', inputValue.trim());
  };

  useEffect(() => {
    handleOnSubmit();
  }, []);

  return (
    <header className={styles.header_bordered}>
      <h2>StarWars Starships</h2>
      <div className={styles.search_container}>
        <input
          className={styles.searchInput}
          type="text"
          placeholder="Search"
          value={inputValue}
          onChange={handleOnChange}
        />
      </div>
      <button onClick={() => handleOnSubmit()}>Search</button>
    </header>
  );
};

export default Header;
