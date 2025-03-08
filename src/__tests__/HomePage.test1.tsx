import React from 'react';
import { render, screen } from '@testing-library/react';
import { Route, Routes } from 'react-router-dom';
import { MemoryRouter } from 'react-router';
// import HomePage from '../HomePage';
import { vi } from 'vitest';
import { useLoaderData, useNavigate } from 'react-router';
import HomePage from '@/components/HomePage';

// Мокаем useLoaderData и useNavigate
vi.mock('react-router', async () => {
  const actual = await vi.importActual('react-router');
  return {
    ...actual,
    useLoaderData: vi.fn(() => ({
      data: [{ id: '1', name: 'Character 1' }],
      meta: { pagination: { records: 10 } },
    })),
    useNavigate: vi.fn(),
  };
});

describe('HomePage', () => {
  test('renders Header, Main, and Footer', () => {
    render(
      <MemoryRouter initialEntries={['/']}>
        <Routes>
          <Route path="/" element={<HomePage />} />
        </Routes>
      </MemoryRouter>
    );

    expect(screen.getByRole('banner')).toBeInTheDocument(); // Header
    expect(screen.getByRole('homePage')).toBeInTheDocument(); // Main
    expect(screen.getByRole('contentinfo')).toBeInTheDocument(); // Footer
  });

  // test('calls navigate when page changes', () => {
  //   const mockNavigate = vi.fn();
  //   vi.mocked(useNavigate).mockReturnValue(mockNavigate);

  //   render(
  //     <MemoryRouter initialEntries={['/']}>
  //       <Routes>
  //         <Route path="/" element={<HomePage />} />
  //       </Routes>
  //     </MemoryRouter>
  //   );

  //   const onPageChanged = (page: number) =>
  //     mockNavigate(`?page=${page}&search=`);

  //   onPageChanged(2);
  //   expect(mockNavigate).toHaveBeenCalledWith('?page=2&search=');
  // });
});
