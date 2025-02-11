import React from 'react';
import styles from './Header.module.css';

type HeaderPropsType = {
  handleOnSubmit: () => void;
  inputValue: string;
  setInputValue: (value: string) => void;
};

const Header: React.FC<HeaderPropsType> = ({
  handleOnSubmit,
  inputValue,
  setInputValue,
}) => {
  const handleOnChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
  };

  return (
    <header className={styles.header_bordered}>
      <h2>Harry Potter Characters</h2>
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
