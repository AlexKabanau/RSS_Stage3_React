'use client';

import React, { useState, useEffect } from 'react';
import styles from './Header.module.css';
import ThemeSelect from './ThemeSelect';
import { useRouter } from 'next/navigation';
import { useSearchParams } from 'next/navigation';
// import { checkRouterElement } from '@/utils/checkRouterElement';

const Header: React.FC = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const initialSearch = searchParams ? searchParams.get('search') || '' : ''; // Проверка на null
  const [inputValue, setInputValue] = useState(initialSearch);

  const handleOnSubmit = () => {
    localStorage.setItem('inputValue', inputValue);
    const params = new URLSearchParams();

    params.set('page', '1');
    if (inputValue) {
      params.set('search', inputValue);
    }

    router.push(`?${params.toString()}`); // Переход с новыми параметрами
  };

  useEffect(() => {
    if (searchParams) {
      setInputValue(searchParams.get('search') || ''); // Обновляем inputValue, если параметр search изменился
    }
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
