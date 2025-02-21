import { ReactNode, useState } from 'react';
import {
  DEFAULT_THEME,
  LOCALSTORAGE_THEME,
  THEMES,
} from '../constants/constants';
import { ThemeContext } from './themeContextCreation';

export type ThemesType = (typeof THEMES)[number];

const ThemeContextProvider = ({ children }: { children: ReactNode }) => {
  const [theme, setTheme] = useState<ThemesType>(() => {
    try {
      const savedTheme = localStorage.getItem(LOCALSTORAGE_THEME) as ThemesType;
      if (savedTheme) return savedTheme;
    } catch (error) {
      console.warn(`Can't read localStorage`, error);
    }

    return DEFAULT_THEME;
  });

  const value = {
    theme,
    changeTheme: (selectedTheme: ThemesType) => {
      try {
        localStorage.setItem(LOCALSTORAGE_THEME, selectedTheme);
      } catch (error) {
        console.warn("Can't access to local storage", error);
      }
      setTheme(selectedTheme);
    },
  };
  return (
    <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
  );
};

export default ThemeContextProvider;
