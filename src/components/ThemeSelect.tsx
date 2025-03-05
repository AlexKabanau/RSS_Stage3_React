import React from 'react';

import { THEMES } from '../constants/constants';
import { ThemesType } from '../context/ThemeContext';
import { useTheme } from '../hooks/useTheme';

const ThemeSelect = () => {
  const { theme, changeTheme } = useTheme();

  return (
    <select
      value={theme}
      onChange={(e) => {
        console.log('Выбрана тема:', e.target.value); // 🔍 Проверяем, передается ли значение
        changeTheme(e.target.value as ThemesType);
      }}
    >
      {THEMES.map((option, key) => (
        <option key={key} value={option}>
          {option}
        </option>
      ))}
    </select>
  );
};

export default ThemeSelect;
