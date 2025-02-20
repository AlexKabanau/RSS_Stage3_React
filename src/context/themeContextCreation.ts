import { createContext } from 'react';
import { DEFAULT_THEME } from '../constants/constants';
import { ThemesType } from './ThemeContext';

type InitialStateType = {
  theme: ThemesType;
  changeTheme: (selectedTheme: ThemesType) => void;
};

export const initialState: InitialStateType = {
  theme: DEFAULT_THEME,
  changeTheme: () => {},
};

export const ThemeContext = createContext(initialState);
