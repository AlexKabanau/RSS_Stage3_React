import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import ThemeSelect from './ThemeSelect';
import { useTheme } from '../hooks/useTheme';
import { THEMES } from '../constants/constants';

// Мокаем хук useTheme
vi.mock('../hooks/useTheme');

describe('ThemeSelect Component', () => {
  const mockChangeTheme = vi.fn();
  const mockUseTheme = useTheme as jest.Mock;

  beforeEach(() => {
    mockUseTheme.mockReturnValue({
      theme: THEMES[0], // Установим начальную тему
      changeTheme: mockChangeTheme,
    });

    render(<ThemeSelect />);
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  it('должен отображать селектор тем', () => {
    const select = screen.getByRole('combobox');
    expect(select).toBeInTheDocument();
  });

  it('должен содержать все темы из THEMES', () => {
    // const select = screen.getByRole('combobox');
    const options = screen.getAllByRole('option');

    expect(options).toHaveLength(THEMES.length); // Проверяем, что количество опций соответствует количеству тем
    THEMES.forEach((theme) => {
      expect(screen.getByRole('option', { name: theme })).toBeInTheDocument(); // Проверяем, что каждая тема отображается в селекторе
    });
  });

  it('должен вызывать changeTheme при выборе темы', () => {
    const select = screen.getByRole('combobox');

    fireEvent.change(select, { target: { value: THEMES[1] } }); // Выбираем другую тему
    expect(mockChangeTheme).toHaveBeenCalledWith(THEMES[1]); // Проверяем, что функция changeTheme вызвана с правильным значением
  });

  it('должен устанавливать значение по умолчанию в соответствии с текущей темой', () => {
    const select = screen.getByRole('combobox');
    expect(select).toHaveValue(THEMES[0]); // Проверяем, что значение по умолчанию соответствует текущей теме
  });
});
