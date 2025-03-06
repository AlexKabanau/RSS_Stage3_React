import React from 'react';
import mockRouter from 'next-router-mock';
// import Details from '@/pages/details/[id]';
import {
  fireEvent,
  render,
  screen,
  waitFor,
  // within,
} from '@testing-library/react';
import { afterEach, beforeEach, describe, expect, test, vi } from 'vitest';
// import { TransformSpellsRequest, transformCard } from './_fakeData';
import { RouterContext } from 'next/dist/shared/lib/router-context.shared-runtime';
// import CharacterDetails from '@/components/card-detail/CardDetail';
// import { NextRouter } from 'next/router';
// import CartPage from '@/pages/CartPage';
import { mockFakeCharacterResponse, mockFakeMoreResponse } from '@/mock/mock';
import ThemeContextProvider from '@/context/ThemeContext';
import { ToastProvider } from '@/components/ToastContext';
import { Provider } from 'react-redux';
import { store } from '@/store/store';
import CartDetailsPage from '@/app/components/CartDetailsPage';
// import CartPage from '@/pages/character/[id]';
//CharacterDetails

const pushMock = vi.fn();
const searchParamValue = '1';

describe('Detailed card tests', () => {
  beforeEach(() => {
    vi.mock('next/navigation', () => ({
      useRouter: () => ({
        push: pushMock,
      }),
      useSearchParams: () => ({
        get: (key: string) => (key === 'search' ? searchParamValue : '1'),
      }),
    }));
  });

  afterEach(() => {
    vi.clearAllMocks();
    vi.resetAllMocks();
  });

  test('Detailed card component correctly displays the detailed card data', async () => {
    mockRouter.setCurrentUrl('/character/643ae975-0c29-49a7-a87e-d052b798962d');

    render(
      <ThemeContextProvider>
        <ToastProvider>
          <Provider store={store}>
            <RouterContext.Provider value={mockRouter}>
              <CartDetailsPage
                cards={mockFakeMoreResponse}
                character={mockFakeCharacterResponse}
              />
            </RouterContext.Provider>
          </Provider>
        </ToastProvider>
      </ThemeContextProvider>
    );

    const cartPage = screen.getByTestId('cart-page');
    expect(cartPage).toBeInTheDocument();
    const closeBtn = screen.getByRole('closeButton');
    expect(closeBtn).toBeInTheDocument();
    const characterName = screen.getByTestId('character-name');
    expect(characterName).toBeInTheDocument();
    const characterSpecies = screen.getByTestId('character-species');
    expect(characterSpecies).toBeInTheDocument();
    const characterGender = screen.getByTestId('character-gender');
    expect(characterGender).toBeInTheDocument();
  });

  // test('Clicking the close button hides the component', async () => {
  //   mockRouter.setCurrentUrl('/character/643ae975-0c29-49a7-a87e-d052b798962d');

  //   render(
  //     <ThemeContextProvider>
  //       <ToastProvider>
  //         <Provider store={store}>
  //           <RouterContext.Provider value={mockRouter}>
  //             <CartDetailsPage
  //               cards={mockFakeMoreResponse}
  //               character={mockFakeCharacterResponse}
  //             />
  //           </RouterContext.Provider>
  //         </Provider>
  //       </ToastProvider>
  //     </ThemeContextProvider>
  //   );

  //   await waitFor(() => {
  //     const cartPage = screen.getByTestId('cart-page');
  //     const closeBtn = screen.getByRole('closeButton');

  //     expect(cartPage).toBeInTheDocument();
  //     // expect(mockRouter.query).toEqual(
  //     //   expect.objectContaining({
  //     //     id: expect.anything(),
  //     //   })
  //     // );

  //     fireEvent.click(closeBtn);
  //     expect(mockRouter.pathname).toBe('/');
  //     // expect(mockRouter.query).toEqual(
  //     //   expect.not.objectContaining({
  //     //     id: expect.anything(),
  //     //   })
  //     // );
  //   });
  // });

  test('Detailed card component correctly displays the detailed card data', async () => {
    mockRouter.setCurrentUrl(
      '/character/?id=643ae975-0c29-49a7-a87e-d052b798962d&page=1&search=ce'
    );

    render(
      <ThemeContextProvider>
        <ToastProvider>
          <Provider store={store}>
            <RouterContext.Provider value={mockRouter}>
              <CartDetailsPage
                cards={mockFakeMoreResponse}
                character={mockFakeCharacterResponse}
              />
            </RouterContext.Provider>
          </Provider>
        </ToastProvider>
      </ThemeContextProvider>
    );

    expect(screen.getAllByRole('item').length).toBe(20);
    expect(mockRouter.query).toEqual({
      id: '643ae975-0c29-49a7-a87e-d052b798962d',
      page: '1',
      search: 'ce',
    });
  });

  test('Close button should close the component', async () => {
    mockRouter.setCurrentUrl(
      '/character/643ae975-0c29-49a7-a87e-d052b798962d?page=1'
    );

    render(
      <ThemeContextProvider>
        <ToastProvider>
          <Provider store={store}>
            <RouterContext.Provider value={mockRouter}>
              <CartDetailsPage
                cards={mockFakeMoreResponse}
                character={mockFakeCharacterResponse}
              />
            </RouterContext.Provider>
          </Provider>
        </ToastProvider>
      </ThemeContextProvider>
    );

    const closeBtn = screen.getByRole('closeButton');
    // expect(closeBtn).toHaveAttribute('href', '/?page=1');
    const cartPage = screen.getByTestId('cart-page');
    expect(cartPage).toBeInTheDocument();

    fireEvent.mouseDown(closeBtn); // Кликаем вне компонента

    waitFor(() => {
      expect(cartPage).not.toBeInTheDocument();
    });
  });

  test('Clicking outside the component closes it', async () => {
    mockRouter.setCurrentUrl('/character/643ae975-0c29-49a7-a87e-d052b798962d');

    render(
      <ThemeContextProvider>
        <ToastProvider>
          <Provider store={store}>
            <RouterContext.Provider value={mockRouter}>
              <CartDetailsPage
                cards={mockFakeMoreResponse}
                character={mockFakeCharacterResponse}
              />
            </RouterContext.Provider>
          </Provider>
        </ToastProvider>
      </ThemeContextProvider>
    );

    const cartPage = screen.getByTestId('cart-page');
    expect(cartPage).toBeInTheDocument();

    fireEvent.mouseDown(document.body); // Кликаем вне компонента

    waitFor(() => {
      expect(cartPage).not.toBeInTheDocument();
    });
  });

  test('Character details display correct attributes', () => {
    mockRouter.setCurrentUrl('/character/643ae975-0c29-49a7-a87e-d052b798962d');

    render(
      <ThemeContextProvider>
        <ToastProvider>
          <Provider store={store}>
            <RouterContext.Provider value={mockRouter}>
              <CartDetailsPage
                cards={mockFakeMoreResponse}
                character={mockFakeCharacterResponse}
              />
            </RouterContext.Provider>
          </Provider>
        </ToastProvider>
      </ThemeContextProvider>
    );

    const characterName = screen.getByTestId('character-name');
    expect(characterName).toHaveTextContent(
      mockFakeCharacterResponse.data.attributes.name
    );

    const characterSpecies = screen.getByTestId('character-species');
    expect(characterSpecies).toHaveTextContent(
      `Species: ${mockFakeCharacterResponse.data.attributes.species}`
    );

    const characterGender = screen.getByTestId('character-gender');
    expect(characterGender).toHaveTextContent(
      `Gender: ${mockFakeCharacterResponse.data.attributes.gender}`
    );

    expect(
      screen.getByText(
        `Hair color: ${mockFakeCharacterResponse.data.attributes.hair_color}`
      )
    ).toBeInTheDocument();
    expect(
      screen.getByText(
        `Eyes color: ${mockFakeCharacterResponse.data.attributes.eye_color}`
      )
    ).toBeInTheDocument();
    // expect(
    //   screen.getByText(
    //     `Skin color: ${mockFakeCharacterResponse.data.attributes.skin_color}`
    //   )
    // ).toBeInTheDocument();

    if (mockFakeCharacterResponse.data.attributes.wiki) {
      expect(screen.getByRole('link', { name: /wiki/i })).toHaveAttribute(
        'href',
        mockFakeCharacterResponse.data.attributes.wiki
      );
    }
  });
});
