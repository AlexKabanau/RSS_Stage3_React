import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import ThemeSelect from './ThemeSelect';
import { useTheme } from '../hooks/useTheme';
import { THEMES } from '../constants/constants';

// Мокаем useTheme
jest.mock('../hooks/useTheme');

describe('ThemeSelect', () => {
  const changeThemeMock = jest.fn(); // Мокаем функцию changeTheme

  beforeEach(() => {
    // Настраиваем useTheme, чтобы возвращать нужные значения
    (useTheme as jest.Mock).mockReturnValue({
      theme: 'light', // Устанавливаем начальную тему
      changeTheme: changeThemeMock, // Используем наш мок
    });
  });

  it('renders correctly', () => {
    render(<ThemeSelect />);

    // Проверяем, что селект рендерится
    const selectElement = screen.getByRole('combobox');
    expect(selectElement).toBeInTheDocument();
  });

  it('displays the correct options', () => {
    render(<ThemeSelect />);

    // Проверяем, что все опции из THEMES отображаются
    THEMES.forEach((theme) => {
      expect(screen.getByText(theme)).toBeInTheDocument();
    });
  });

  it('calls changeTheme with the selected theme', () => {
    render(<ThemeSelect />);

    // Получаем селект
    const selectElement = screen.getByRole('combobox');

    // Выбираем другую тему
    userEvent.selectOptions(selectElement, THEMES[1]); // Например, выбираем вторую тему

    // Проверяем, что changeTheme был вызван с правильным значением
    expect(changeThemeMock).toHaveBeenCalledWith(THEMES[1]);
  });
});
