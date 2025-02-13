import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import ThemeSelect from './ThemeSelect';
import { useTheme } from '../hooks/useTheme';
import { THEMES } from '../constants/constants';
import { ThemesType } from '../context/ThemeContext';

vi.mock('../hooks/useTheme');

describe('ThemeSelect Component', () => {
  test('renders without crashing', () => {
    (useTheme as jest.Mock).mockReturnValue({
      theme: THEMES[0],
      changeTheme: vi.fn(),
    });

    render(<ThemeSelect />);
    expect(screen.getByRole('combobox')).toBeInTheDocument();
  });

  test('renders all theme options', () => {
    (useTheme as jest.Mock).mockReturnValue({
      theme: THEMES[0],
      changeTheme: vi.fn(),
    });

    render(<ThemeSelect />);
    THEMES.forEach((theme) => {
      expect(screen.getByRole('option', { name: theme })).toBeInTheDocument();
    });
  });

  test('calls changeTheme on theme change', () => {
    const mockChangeTheme = vi.fn();

    (useTheme as jest.Mock).mockReturnValue({
      theme: THEMES[0],
      changeTheme: mockChangeTheme,
    });

    render(<ThemeSelect />);

    const select = screen.getByRole('combobox');
    fireEvent.change(select, { target: { value: THEMES[1] as ThemesType } });

    expect(mockChangeTheme).toHaveBeenCalledWith(THEMES[1]);
  });
});
