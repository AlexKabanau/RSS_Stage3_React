import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import { getCharacter } from '../../api/getItems';
import CartPage from '.';
import { mockFakeCharacterResponse } from '../../mock/mock';

vi.mock('../../api/getItems', () => ({
  getCharacter: vi.fn(),
}));

describe('CartPage', () => {
  // test('renders without crashing', () => {
  //   render(
  //     <MemoryRouter initialEntries={['/character/1']}>
  //       <Routes>
  //         <Route path="/character/:id" element={<CartPage />} />
  //       </Routes>
  //     </MemoryRouter>
  //   );
  //   expect(screen.getByRole('button', { name: 'Hide' })).toBeInTheDocument();
  // });
  // test('toggles visibility when clicking the button', () => {
  //   render(
  //     <MemoryRouter initialEntries={['/character/1']}>
  //       <Routes>
  //         <Route path="/character/:id" element={<CartPage />} />
  //       </Routes>
  //     </MemoryRouter>
  //   );
  //   const toggleButton = screen.getByRole('button');
  //   expect(screen.getByRole('container')).toHaveClass('visible');
  //   fireEvent.click(toggleButton);
  //   expect(screen.getByRole('container')).toHaveClass('hidden');
  //   fireEvent.click(toggleButton);
  //   expect(screen.getByRole('container')).toHaveClass('visible');
  // });
  // test('shows loading indicator while fetching data', async () => {
  //   (getCharacter as jest.Mock).mockImplementation(
  //     () =>
  //       new Promise((resolve) =>
  //         setTimeout(() => resolve(mockFakeCharacterResponse), 100)
  //       )
  //   );
  //   render(
  //     <MemoryRouter
  //       initialEntries={['/character/b832f9ed-fe71-46f5-a9e1-b947a49161e2']}
  //     >
  //       <Routes>
  //         <Route path="/character/:id" element={<CartPage />} />
  //       </Routes>
  //     </MemoryRouter>
  //   );
  //   expect(screen.getByRole('loading')).toBeInTheDocument();
  //   await waitFor(() =>
  //     expect(screen.queryByRole('loading')).not.toBeInTheDocument()
  //   );
  // });
  // test('renders character data after loading', async () => {
  //   (getCharacter as jest.Mock).mockImplementation(
  //     () =>
  //       new Promise((resolve) =>
  //         setTimeout(() => resolve(mockFakeCharacterResponse), 1000)
  //       )
  //   );
  //   render(
  //     <MemoryRouter
  //       initialEntries={['/character/b832f9ed-fe71-46f5-a9e1-b947a49161e2']}
  //     >
  //       <Routes>
  //         <Route path="/character/:id" element={<CartPage />} />
  //       </Routes>
  //     </MemoryRouter>
  //   );
  //   await screen.findByText(
  //     /Lily J. Potter \(née Evans\)/i,
  //     {},
  //     { timeout: 3000 }
  //   );
  //   expect(screen.getByText('Lily J. Potter (née Evans)')).toBeInTheDocument();
  //   expect(screen.getByText('Species: Human')).toBeInTheDocument();
  //   expect(screen.getByText('Gender: Female')).toBeInTheDocument();
  //   expect(screen.getByText('Nationality: English')).toBeInTheDocument();
  //   expect(screen.getByText('Hair color: Dark red')).toBeInTheDocument();
  //   expect(screen.getByText('Eye color: Bright green')).toBeInTheDocument();
  //   expect(screen.getByRole('link', { name: 'Wiki' })).toHaveAttribute(
  //     'href',
  //     'https://harrypotter.fandom.com/wiki/Lily_Potter_(I)'
  //   );
  // });
});
