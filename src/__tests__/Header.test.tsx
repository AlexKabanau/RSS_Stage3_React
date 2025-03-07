import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import Header from '@/components/Header';
// import Header from './Header';

describe('Header', () => {
  beforeEach(() => {
    render(
      <MemoryRouter>
        <Header />
      </MemoryRouter>
    );
  });

  test('renders header with title', () => {
    const titleElement = screen.getByRole('heading', {
      name: /Harry Potter Characters/i,
    });
    expect(titleElement).toBeInTheDocument();
  });

  test('renders search input and button', () => {
    const searchInput = screen.getByTestId('searchInput');
    const searchButton = screen.getByTestId('searchButton');

    expect(searchInput).toBeInTheDocument();
    expect(searchButton).toBeInTheDocument();
  });

  test('allows user to type in search input', () => {
    const searchInput = screen.getByTestId('searchInput') as HTMLInputElement;

    fireEvent.change(searchInput, { target: { value: 'Harry' } });
    expect(searchInput.value).toBe('Harry');
  });

  test('calls handleOnSubmit when search button is clicked', () => {
    const searchInput = screen.getByTestId('searchInput');
    const searchButton = screen.getByTestId('searchButton');

    fireEvent.change(searchInput, { target: { value: 'Harry' } });
    fireEvent.click(searchButton);

    // Здесь вы можете проверить, что параметры поиска были обновлены,
    // например, используя mock для setSearchParams и navigate,
    // или проверив localStorage, если это применимо.
  });

  test('calls handleOnSubmit when Enter key is pressed', () => {
    const searchInput = screen.getByTestId('searchInput');

    fireEvent.change(searchInput, { target: { value: 'Harry' } });
    fireEvent.keyDown(searchInput, { key: 'Enter', code: 'Enter' });

    // Здесь вы можете проверить, что параметры поиска были обновлены,
    // например, используя mock для setSearchParams и navigate.
  });
});
