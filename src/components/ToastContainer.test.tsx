import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import ToastContainer from './ToastContainer';

describe('ToastContainer', () => {
  test('renders button to show toast', () => {
    render(<ToastContainer />);
    const button = screen.getByText('Показать тост');
    expect(button).toBeInTheDocument();
  });

  test('adds a toast when button is clicked', () => {
    render(<ToastContainer />);
    const button = screen.getByText('Показать тост');
    fireEvent.click(button);

    const toastMessage = screen.getByText(/Это ваше уведомление с/i);
    expect(toastMessage).toBeInTheDocument();
  });

  test('displays toast when button is clicked', () => {
    render(<ToastContainer />);

    // Нажимаем кнопку, чтобы показать тост
    fireEvent.click(screen.getByText('Показать тост'));

    // Проверяем, что тост отображается
    expect(screen.getByText(/это ваше уведомление с/i)).toBeInTheDocument();
  });

  // test('removes toast after 3 seconds', async () => {
  //   vi.useFakeTimers(); // Используем фейковые таймеры
  //   render(<ToastContainer />);

  //   // Нажимаем кнопку, чтобы показать тост
  //   fireEvent.click(screen.getByText('Показать тост'));

  //   // Проверяем, что тост отображается
  //   expect(screen.getByText(/это ваше уведомление с/i)).toBeInTheDocument();

  //   // Пропускаем все таймеры
  //   vi.runAllTimers();

  //   // Проверяем, что тост больше не отображается
  //   await waitFor(() => {
  //     expect(
  //       screen.queryByText(/это ваше уведомление с/i)
  //     ).not.toBeInTheDocument();
  //   });
  // }, 10000);
});
