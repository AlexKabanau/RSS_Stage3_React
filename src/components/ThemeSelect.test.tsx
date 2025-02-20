import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import ThemeSelect from './ThemeSelect';
import { useTheme } from '../hooks/useTheme';
import { THEMES } from '../constants/constants';

vi.mock('../hooks/useTheme');

describe('ThemeSelect Component', () => {
  const mockChangeTheme = vi.fn();
  const mockUseTheme = useTheme as jest.Mock;

  beforeEach(() => {
    mockUseTheme.mockReturnValue({
      theme: THEMES[0],
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
    const options = screen.getAllByRole('option');

    expect(options).toHaveLength(THEMES.length);
    THEMES.forEach((theme) => {
      expect(screen.getByRole('option', { name: theme })).toBeInTheDocument();
    });
  });

  it('должен вызывать changeTheme при выборе темы', () => {
    const select = screen.getByRole('combobox');

    fireEvent.change(select, { target: { value: THEMES[1] } });
    expect(mockChangeTheme).toHaveBeenCalledWith(THEMES[1]);
  });

  it('должен устанавливать значение по умолчанию в соответствии с текущей темой', () => {
    const select = screen.getByRole('combobox');
    expect(select).toHaveValue(THEMES[0]);
  });
});
