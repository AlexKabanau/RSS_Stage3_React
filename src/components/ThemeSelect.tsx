import { THEMES } from '../constants/constants';
import { ThemesType } from '../context/ThemeContext';
import { useTheme } from '../hooks/useTheme';

const ThemeSelect = () => {
  const { theme, changeTheme } = useTheme();

  return (
    <select
      defaultValue={theme}
      onChange={(e) => {
        const selectedTheme = e.target.value as ThemesType;
        changeTheme(selectedTheme);
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
