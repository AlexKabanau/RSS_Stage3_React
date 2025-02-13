import { createContext, ReactNode, useState } from 'react';
import {
  DEFAULT_THEME,
  LOCALSTORAGE_THEME,
  THEMES,
} from '../constants/constants';

export type ThemesType = (typeof THEMES)[number];

type InitialStateType = {
  theme: ThemesType;
  changeTheme: (selectedTheme: ThemesType) => void;
};

const initialState: InitialStateType = {
  theme: DEFAULT_THEME,
  changeTheme: () => {},
};

export const ThemeContext = createContext(initialState);

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

  // useEffect(() => {
  //   const darkModePreference = window.matchMedia(
  //     '(prefers-color-scheme: dark)'
  //   );

  //   if (theme === 'system') {
  //     darkModePreference.matches
  //       ? document.body.classList.add('dark')
  //       : document.body.classList.remove('dark');

  //     // const handleSystemThemeChange = (e: MediaQueryListEvent) => {
  //     //   e.matches
  //     //     ? document.body.classList.add('dark')
  //     //     : document.body.classList.remove('dark');
  //     // };

  //     // darkModePreference.addEventListener('change', handleSystemThemeChange);

  //     // return () => {
  //     //   darkModePreference.removeEventListener(
  //     //     'change',
  //     //     handleSystemThemeChange
  //     //   );
  //     // };
  //   }

  //   if (theme === 'dark') {
  //     document.body.classList.add('dark');
  //   }

  //   if (theme === 'light') {
  //     document.body.classList.remove('dark');
  //   }
  // }, [theme]);

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
