'use client';
import React from 'react';

import { ReactNode, useEffect, useState } from 'react';
import {
  DEFAULT_THEME,
  LOCALSTORAGE_THEME,
  THEMES,
} from '../constants/constants';
import { ThemeContext } from './themeContextCreation';
import cn from 'classnames'; // Удобная утилита для работы с className (по желанию)

export type ThemesType = (typeof THEMES)[number];

const ThemeContextProvider = ({ children }: { children: ReactNode }) => {
  const [theme, setTheme] = useState<ThemesType>(DEFAULT_THEME);
  // const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    try {
      const savedTheme = localStorage.getItem(LOCALSTORAGE_THEME) as ThemesType;
      console.log('Загруженная тема из localStorage:', savedTheme); // 🔍 Проверяем, что хранится в localStorage
      if (savedTheme && THEMES.includes(savedTheme)) {
        setTheme(savedTheme);
      }
    } catch (error) {
      console.warn('Ошибка чтения localStorage', error);
    }
  }, []);

  const changeTheme = (selectedTheme: ThemesType) => {
    console.log('changeTheme вызван с темой:', selectedTheme); // 🔍 Проверяем вызов функции
    try {
      localStorage.setItem(LOCALSTORAGE_THEME, selectedTheme);
      console.log(
        'localStorage обновлён:',
        localStorage.getItem(LOCALSTORAGE_THEME)
      ); // 🔍 Проверяем запись в localStorage
      setTheme(selectedTheme);
    } catch (error) {
      console.warn('Ошибка доступа к localStorage', error);
    }
  };

  useEffect(() => {
    console.log('🔥 Текущая тема в useEffect:', theme);
  }, [theme]);

  return (
    <ThemeContext.Provider value={{ theme, changeTheme }}>
      <div className={cn(theme)}>{children}</div>
    </ThemeContext.Provider>
  );
};

export default ThemeContextProvider;
