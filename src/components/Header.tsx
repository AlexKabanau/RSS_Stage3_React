import React, { useState } from 'react';
import styles from './Header.module.css';
import ThemeSelect from './ThemeSelect';
import { useAppDispatch } from '@/store/store';
import { setQueryParamsToState } from '@/store/reducers/queryParams';

type HeaderPropsType = {
  // handleOnSubmit: () => void;
  // inputValue: string;
  // setInputValue: (value: string) => void;
};

const Header: React.FC<HeaderPropsType> = (
  {
    // handleOnSubmit,
    // inputValue,
    // setInputValue,
  }
) => {
  const [inputValue, setInputValue] = useState('');
  const dispatch = useAppDispatch();

  const handleOnSubmit = () => {
    localStorage.setItem('inputValue', inputValue);
    dispatch(setQueryParamsToState(inputValue));
    // dispatch(setPage('1'));
    // setSearch({ limit, page: `1` });
  };
  // const handleOnChange = (event: React.ChangeEvent<HTMLInputElement>) => {
  //   setInputValue(event.target.value);
  // };

  return (
    <header className={styles.header_bordered}>
      <h2>Harry Potter Characters</h2>
      <div className={styles.search_container}>
        <input
          className={styles.searchInput}
          type="text"
          placeholder="Search"
          value={inputValue}
          onChange={(event) => setInputValue(event.target.value)}
          // onChange={handleOnChange}
          onKeyDown={(e) => {
            if (e.key === 'Enter') handleOnSubmit();
          }}
        />
      </div>
      <button onClick={() => handleOnSubmit()}>Search</button>
      {/* <ThemeSelect /> */}
    </header>
  );
};

export default Header;
