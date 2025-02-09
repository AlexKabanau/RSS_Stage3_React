import { render, screen, fireEvent } from '@testing-library/react';
import Header from './Header';

describe('Header Component', () => {
  let inputValue: string;

  const setInputValue = (value: string) => {
    inputValue = value;
    localStorage.setItem('searchValue', value.trim());
  };

  const handleOnSubmit = () => {
    console.log('Search submitted');
  };

  beforeEach(() => {
    inputValue = '';
    render(
      <Header
        handleOnSubmit={handleOnSubmit}
        inputValue={inputValue}
        setInputValue={setInputValue}
      />
    );
  });

  test('renders header with correct title', () => {
    expect(
      screen.getByRole('heading', { name: /Harry Potter Characters/i })
    ).toBeInTheDocument();
  });

  test('renders input and button', () => {
    expect(screen.getByPlaceholderText(/Search/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Search/i })).toBeInTheDocument();
  });

  test('calls handleOnSubmit when button is clicked', () => {
    const button = screen.getByRole('button', { name: /Search/i });
    fireEvent.click(button);
  });
});
