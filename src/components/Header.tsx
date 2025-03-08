import React, { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import styles from './Header.module.css';
import ThemeSelect from './ThemeSelect';

const Header: React.FC = () => {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const initialSearch = searchParams.get('search') || '';
  const [inputValue, setInputValue] = useState(initialSearch);

  const handleOnSubmit = () => {
    localStorage.setItem('inputValue', inputValue);
    const newParams = new URLSearchParams();

    newParams.set('page', '1');
    if (inputValue) {
      newParams.set('search', inputValue);
    }

    setSearchParams(newParams);
    navigate(`?${newParams.toString()}`);
  };

  useEffect(() => {
    setInputValue(searchParams.get('search') || '');
  }, [searchParams]);

  return (
    <header className={styles.header_bordered}>
      <h2>Harry Potter Characters</h2>
      <div className={styles.search_container}>
        <input
          data-testid="searchInput"
          className={styles.searchInput}
          type="text"
          placeholder="Search"
          value={inputValue}
          onChange={(event) => setInputValue(event.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter') handleOnSubmit();
          }}
        />
      </div>
      <button data-testid="searchButton" onClick={handleOnSubmit}>
        Search
      </button>
      <ThemeSelect />
    </header>
  );
};

export default Header;
