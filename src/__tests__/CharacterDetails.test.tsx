import React from 'react';
import { render, screen } from '@testing-library/react';
import { createMemoryRouter, RouterProvider } from 'react-router-dom';
import { vi } from 'vitest';
// import CharacterDetails from '../CharacterDetails';
import { GetCharacterType } from '@/api/getItems';
import CharacterDetails from '@/components/CharacterDetails';
import { mockFakeCharacterResponse } from '@/mock/mock';

// Мокаем useNavigate
const mockNavigate = vi.fn();
vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual('react-router-dom');
  return {
    ...actual,
    useNavigate: () => mockNavigate,
  };
});

// Мок данных для useLoaderData
const mockCharacterData: GetCharacterType = mockFakeCharacterResponse;

// Функция-загрузчик для теста
const loader = () => mockCharacterData;

describe('CharacterDetails', () => {
  test('renders character details correctly', async () => {
    const router = createMemoryRouter(
      [
        {
          path: '/character/:id',
          element: <CharacterDetails />,
          loader,
        },
      ],
      {
        initialEntries: ['/character/1'],
      }
    );

    render(<RouterProvider router={router} />);

    expect(await screen.findByTestId('character-name')).toHaveTextContent(
      'Lily J. Potter (née Evans)'
    );
    expect(screen.getByTestId('character-species')).toHaveTextContent(
      'Species: Human'
    );
    expect(screen.getByTestId('character-gender')).toHaveTextContent(
      'Gender: Female'
    );
    expect(screen.getByText('Hair color: Dark red')).toBeInTheDocument();
    expect(screen.getByText('Eyes color: Bright green')).toBeInTheDocument();
    // expect(screen.getByText('Skin color: Fair')).toBeInTheDocument();
    expect(screen.getByRole('link', { name: 'Wiki' })).toHaveAttribute(
      'href',
      'https://harrypotter.fandom.com/wiki/Lily_Potter_(I)'
    );
  });

  // test('closes character details when clicking close button', async () => {
  //   const router = createMemoryRouter(
  //     [
  //       {
  //         path: '/character/:id',
  //         element: <CharacterDetails />,
  //         loader,
  //       },
  //     ],
  //     {
  //       initialEntries: ['/character/1'],
  //     }
  //   );

  //   render(<RouterProvider router={router} />);

  //   const closeButton = await screen.findByRole('closeButton');
  //   fireEvent.click(closeButton);

  //   expect(mockNavigate).toHaveBeenCalledWith('/?page=1');
  // });
});
