import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router';
import MockAdapter from 'axios-mock-adapter';

import HomePage from '.';
import axios from 'axios';
import { mockFakeResponse } from '../../mock/mock';

const mockAxiosAPI = new MockAdapter(axios);

describe('HomePage test', () => {
  it('HomePage should be defined', () => {
    expect(HomePage).toBeDefined();
  });
  // it('HomePage should render', () => {
  //   render(
  //     <MemoryRouter initialEntries={['/']}>
  //       <HomePage />
  //     </MemoryRouter>
  //   );
  //   const mainPage = screen.getByRole('mainPage');
  //   expect(mainPage).toBeInTheDocument();
  // });
  // it('HomePage should send request', () => {
  //   render(
  //     <MemoryRouter initialEntries={['/']}>
  //       <HomePage />
  //     </MemoryRouter>
  //   );
  //   const spy = vi.spyOn(mockAxiosAPI, 'onGet');
  //   mockAxiosAPI
  //     .onGet(
  //       'https://api.potterdb.com/v1/characters?page[size]=8&page[number]=3&filter[name_cont_any]=Weasley'
  //     )
  //     .reply(200, mockFakeResponse);
  //   expect(spy).toHaveBeenCalledTimes(1);
  //   mockAxiosAPI.reset();
  // });
});
