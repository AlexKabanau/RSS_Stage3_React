import React, { useState } from 'react';
import styles from './Header.module.css';
import ThemeSelect from './ThemeSelect';
import { useRouter } from 'next/router';
import { checkRouterElement } from '@/utils/checkRouterElement';

const Header: React.FC = () => {
  const router = useRouter();
  let { search } = router.query;
  search = checkRouterElement(search, '');
  const [inputValue, setInputValue] = useState(search);

  const handleOnSubmit = () => {
    localStorage.setItem('inputValue', inputValue);
    if (router.pathname === '/') {
      if (inputValue) {
        router.push({
          query: { page: '1', search: inputValue },
        });
      } else {
        router.push({
          query: { page: '1' },
        });
      }
    }
  };

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
      <button data-testid="searchButton" onClick={() => handleOnSubmit()}>
        Search
      </button>
      <ThemeSelect />
    </header>
  );
};

export default Header;
