import { useEffect, useState } from 'react';
import styles from './Header.module.css';
import { getItems, ResponseType } from '../api/getItems';

type HeaderPropsType = {
  handleResponse: (data: ResponseType[]) => void;
  setIsLoading: (isLoading: boolean) => void;
  setIsError: (isError: boolean) => void;
};

import React from 'react';

const Header: React.FC<HeaderPropsType> = ({
  handleResponse,
  setIsError,
  setIsLoading,
}) => {
  const [inputValue, setInputValue] = useState(
    localStorage.getItem('searchValue') || ''
  );

  const handleOnChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
    localStorage.setItem('searchValue', inputValue.trim());
  };

  const handleOnSubmit = async () => {
    localStorage.setItem('searchValue', inputValue);
    try {
      setIsLoading(true);
      const response = await getItems(inputValue);

      if (response) {
        setIsLoading(false);
        setIsError(false);
        handleResponse(response);
      }
    } catch (error) {
      console.error(error);
      setIsLoading(false);
      setIsError(true);
    }
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
