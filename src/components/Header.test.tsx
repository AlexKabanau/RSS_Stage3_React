import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import Header from './Header';

describe('Header Component', () => {
  const mockHandleOnSubmit = vi.fn();
  const mockSetInputValue = vi.fn();

  beforeEach(() => {
    render(
      <Header
        handleOnSubmit={mockHandleOnSubmit}
        inputValue=""
        setInputValue={mockSetInputValue}
      />
    );
  });

  it('должен отображать заголовок "Harry Potter Characters"', () => {
    const title = screen.getByRole('heading', {
      name: /Harry Potter Characters/i,
    });
    expect(title).toBeInTheDocument();
  });

  it('должен отображать поле ввода для поиска', () => {
    const input = screen.getByPlaceholderText('Search');
    expect(input).toBeInTheDocument();
    expect(input).toHaveValue('');
  });

  it('должен вызывать setInputValue при вводе текста', () => {
    const input = screen.getByPlaceholderText('Search');
    fireEvent.change(input, { target: { value: 'Harry' } });

    expect(mockSetInputValue).toHaveBeenCalledWith('Harry');
  });

  it('должен вызывать handleOnSubmit при нажатии кнопки "Search"', () => {
    const button = screen.getByRole('button', { name: /Search/i });
    fireEvent.click(button);

    expect(mockHandleOnSubmit).toHaveBeenCalled();
  });

  it('должен вызывать handleOnSubmit при нажатии клавиши Enter в поле ввода', () => {
    const input = screen.getByPlaceholderText('Search');
    fireEvent.change(input, { target: { value: 'Harry' } });
    fireEvent.keyDown(input, { key: 'Enter', code: 'Enter' });

    expect(mockHandleOnSubmit).toHaveBeenCalled();
  });
});
