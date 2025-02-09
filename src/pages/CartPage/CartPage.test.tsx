import { fireEvent, render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router';
import MockAdapter from 'axios-mock-adapter';

import CartPage from '.';
import axios from 'axios';
import { mockFakeCharacterResponse } from '../../mock/mock';

const mockAxiosAPI = new MockAdapter(axios);

describe('CartPage test', () => {
  it('CartPage should be defined', () => {
    expect(CartPage).toBeDefined();
  });

  it('CartPage should render', () => {
    render(
      <MemoryRouter
        initialEntries={[
          '/character/b832f9ed-fe71-46f5-a9e1-b947a49161e2?search=potter&page=3',
        ]}
      >
        <CartPage />
      </MemoryRouter>
    );

    const button = screen.getByRole('button');

    expect(button).toBeInTheDocument();
  });

  it('CartPage should send request', () => {
    render(
      <MemoryRouter
        initialEntries={[
          '/character/b832f9ed-fe71-46f5-a9e1-b947a49161e2?search=potter&page=3',
        ]}
      >
        <CartPage />
      </MemoryRouter>
    );

    const spy = vi.spyOn(mockAxiosAPI, 'onGet');
    mockAxiosAPI
      .onGet(
        'https://api.potterdb.com/v1/characters/b832f9ed-fe71-46f5-a9e1-b947a49161e2'
      )
      .reply(200, mockFakeCharacterResponse);

    expect(spy).toHaveBeenCalledTimes(1);
    mockAxiosAPI.reset();
  });

  it('Click to `Hide` button should hide character', () => {
    render(
      <MemoryRouter
        initialEntries={[
          '/character/b832f9ed-fe71-46f5-a9e1-b947a49161e2?search=potter&page=3',
        ]}
      >
        <CartPage />
      </MemoryRouter>
    );

    const button = screen.getByRole('button');
    fireEvent.click(button);

    const container = screen.getByRole('container');
    expect(container).toHaveClass('hidden');
  });
});
