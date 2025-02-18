// Toast.test.tsx
import React from 'react';
import { render, screen } from '@testing-library/react';
import Toast from './Toast';

describe('Toast component', () => {
  it('renders content correctly', () => {
    const content = <span>This is a toast message!</span>;

    render(<Toast content={content} />);

    // Проверяем, что контент отображается
    expect(screen.getByText('This is a toast message!')).toBeInTheDocument();
  });

  it('has the correct class name', () => {
    const content = <span>Another toast message!</span>;

    render(<Toast content={content} />);

    // Проверяем, что компонент Toast отрисовывается и имеет класс 'toast'
    const toastElement = screen.getByText('Another toast message!');

    // Проверяем, что элемент существует
    expect(toastElement).toBeInTheDocument();

    // Проверяем, что класс toast присутствует
    expect(toastElement.parentElement).toHaveClass('toast');
  });
});
