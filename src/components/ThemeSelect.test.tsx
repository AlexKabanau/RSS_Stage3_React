// ThemeSelect.test.tsx
import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import ThemeSelect from './ThemeSelect';
import { useTheme } from '../hooks/useTheme';
import { THEMES } from '../constants/constants';

vi.mock('../hooks/useTheme', () => ({
  useTheme: vi.fn(),
}));

const mockChangeTheme = vi.fn();

describe('ThemeSelect', () => {
  beforeEach(() => {
    (useTheme as jest.Mock).mockReturnValue({
      theme: 'light', // текущая тема для теста
      changeTheme: mockChangeTheme, // мок функции смены темы
    });
  });

  it('should render the current theme', () => {
    render(<ThemeSelect />);
    const selectElement = screen.getByRole('combobox');
    expect(selectElement).toHaveValue('light'); // проверяем, что выбранная тема соответствует текущей
  });

  it('should render the correct number of theme options', () => {
    render(<ThemeSelect />);
    const options = screen.getAllByRole('option');
    expect(options).toHaveLength(THEMES.length); // проверяем, что количество опций соответствует количеству тем
  });

  it('should call changeTheme when a new theme is selected', () => {
    render(<ThemeSelect />);
    const selectElement = screen.getByRole('combobox');

    fireEvent.change(selectElement, { target: { value: 'dark' } }); // выбираем новую тему
    expect(mockChangeTheme).toHaveBeenCalledWith('dark'); // проверяем, что функция была вызвана с правильным аргументом
  });
});
