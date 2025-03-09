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
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);

    try {
      const savedTheme = localStorage.getItem(LOCALSTORAGE_THEME) as ThemesType;
      if (savedTheme) setTheme(savedTheme);
    } catch (error) {
      console.warn(`Can't read localStorage`, error);
    }
  }, []);

  const changeTheme = (selectedTheme: ThemesType) => {
    try {
      localStorage.setItem(LOCALSTORAGE_THEME, selectedTheme);
    } catch (error) {
      console.warn("Can't access localStorage", error);
    }
    setTheme(selectedTheme);
  };

  return (
    <ThemeContext.Provider value={{ theme, changeTheme }}>
      <div className={cn(theme)}>{isMounted ? children : null}</div>
    </ThemeContext.Provider>
  );
};

export default ThemeContextProvider;
