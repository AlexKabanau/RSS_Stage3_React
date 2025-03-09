import { useContext } from 'react';
import { ThemeContext } from '../context/themeContextCreation';

export const useTheme = () => {
  const context = useContext(ThemeContext);
  return context;
};
