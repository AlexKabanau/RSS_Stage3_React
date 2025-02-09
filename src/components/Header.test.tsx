// import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import Header from './Header';

describe('Header Component', () => {
  let inputValue: string;

  // Простая функция для установки значения
  const setInputValue = (value: string) => {
    inputValue = value;
    localStorage.setItem('searchValue', value.trim());
  };

  // Функция для обработки отправки
  const handleOnSubmit = () => {
    // Здесь можно добавить логику для проверки отправки
    console.log('Search submitted');
  };

  beforeEach(() => {
    // Сбрасываем значение перед каждым тестом
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

  // test('updates input value and calls setInputValue on change', () => {
  //   const input = screen.getByPlaceholderText(/Search/i);
  //   fireEvent.change(input, { target: { value: 'Harry' } });

  //   // Проверяем, что значение inputValue обновляется
  //   expect(inputValue).toBe('Harry');
  //   expect(localStorage.getItem('searchValue')).toBe('Harry');
  // });

  test('calls handleOnSubmit when button is clicked', () => {
    const button = screen.getByRole('button', { name: /Search/i });
    fireEvent.click(button);

    // Здесь можно проверить, что функция handleOnSubmit была вызвана, например,
    // с помощью console.log, если необходимо, или добавить дополнительную логику
    // в функцию handleOnSubmit для проверки.
  });
});
