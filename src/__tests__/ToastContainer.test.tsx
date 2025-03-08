import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import ToastContainer from '@/components/ToastContainer';

describe('ToastContainer Component', () => {
  it('должен добавлять тост при нажатии кнопки', () => {
    render(<ToastContainer />);

    const button = screen.getByRole('button', { name: /Показать тост/i });
    fireEvent.click(button);

    const toast = screen.getByText(/Это ваше уведомление с/i);
    expect(toast).toBeInTheDocument();
  });

  it('должен удалять тост через 3 секунды', async () => {
    render(<ToastContainer />);

    const button = screen.getByRole('button', { name: /Показать тост/i });
    fireEvent.click(button);

    const toast = screen.getByText(/Это ваше уведомление с/i);
    expect(toast).toBeInTheDocument();

    await new Promise((resolve) => setTimeout(resolve, 3000));

    await waitFor(() => {
      expect(toast).not.toBeInTheDocument();
    });
  });
});
