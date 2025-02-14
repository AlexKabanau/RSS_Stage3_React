// import React from 'react';
import { render, screen, act } from '@testing-library/react';
import ThemeContextProvider, { ThemeContext } from './ThemeContext';
import { THEMES, LOCALSTORAGE_THEME } from '../constants/constants';

describe('ThemeContextProvider', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  test('provides default theme', () => {
    render(
      <ThemeContextProvider>
        <ThemeContext.Consumer>
          {(value) => <span>{value.theme}</span>}
        </ThemeContext.Consumer>
      </ThemeContextProvider>
    );

    expect(screen.getByText(THEMES[0])).toBeInTheDocument();
  });

  test('updates theme and stores in localStorage', () => {
    render(
      <ThemeContextProvider>
        <ThemeContext.Consumer>
          {(value) => (
            <button onClick={() => value.changeTheme(THEMES[1])}>
              Change Theme
            </button>
          )}
        </ThemeContext.Consumer>
      </ThemeContextProvider>
    );

    act(() => {
      screen.getByText('Change Theme').click();
    });

    expect(localStorage.getItem(LOCALSTORAGE_THEME)).toBe(THEMES[1]);
  });

  test('reads theme from localStorage on mount', () => {
    localStorage.setItem(LOCALSTORAGE_THEME, THEMES[1]);

    render(
      <ThemeContextProvider>
        <ThemeContext.Consumer>
          {(value) => <span>{value.theme}</span>}
        </ThemeContext.Consumer>
      </ThemeContextProvider>
    );

    expect(screen.getByText(THEMES[1])).toBeInTheDocument();
  });
});
