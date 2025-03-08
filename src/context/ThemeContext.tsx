'use client';
import React from 'react';

import { ReactNode, useEffect, useState } from 'react';
import {
  DEFAULT_THEME,
  LOCALSTORAGE_THEME,
  THEMES,
} from '../constants/constants';
import { ThemeContext } from './themeContextCreation';
import cn from 'classnames';

export type ThemesType = (typeof THEMES)[number];

const ThemeContextProvider = ({ children }: { children: ReactNode }) => {
  const [theme, setTheme] = useState<ThemesType>(DEFAULT_THEME);

  useEffect(() => {
    try {
      const savedTheme = localStorage.getItem(LOCALSTORAGE_THEME) as ThemesType;
      if (savedTheme && THEMES.includes(savedTheme)) {
        setTheme(savedTheme);
      }
    } catch (error) {
      console.warn('Ошибка чтения localStorage', error);
    }
  }, []);

  const changeTheme = (selectedTheme: ThemesType) => {
    try {
      localStorage.setItem(LOCALSTORAGE_THEME, selectedTheme);

      setTheme(selectedTheme);
    } catch (error) {
      console.warn('Ошибка доступа к localStorage', error);
    }
  };

  return (
    <ThemeContext.Provider value={{ theme, changeTheme }}>
      <div className={cn(theme)}>{children}</div>
    </ThemeContext.Provider>
  );
};

export default ThemeContextProvider;
