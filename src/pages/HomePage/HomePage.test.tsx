import React, { StrictMode } from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { MemoryRouter, Route, Routes } from 'react-router';
import MockAdapter from 'axios-mock-adapter';
import axios from 'axios';
import { Provider } from 'react-redux';
import ThemeContextProvider from '../../context/ThemeContext';
import { ToastProvider } from '../../components/ToastContext';
import { RootStateType, store } from '../../store/store';
import HomePage from '.';
import { mockFakeResponse, mockFakeResponseNoItems } from '../../mock/mock';
import { configureStore } from '@reduxjs/toolkit';
import searchParams from '../../store/slice/serchParamsSlice';
import queryParams from '../../store/slice/queryParamsSlice';
import favorits from '../../store/slice/favoritsSlice';
import character from '../../store/slice/characterSlice';
import characters from '../../store/slice/chractersSlice';
import userEvent from '@testing-library/user-event';
import ErrorBoundary from '../../components/ErrorBoundary';
import { api, useGetCharactersQuery } from '../../api/redux.api';

const mockAxiosAPI = new MockAdapter(axios);

describe('HomePage tests', () => {
  beforeEach(() => {
    mockAxiosAPI.reset();
  });

  it('HomePage should be defined', () => {
    expect(HomePage).toBeDefined();
  });

  it('HomePage should render', () => {
    render(
      <Provider store={store}>
        <ThemeContextProvider>
          <ToastProvider>
            <MemoryRouter initialEntries={['/']}>
              <HomePage />
            </MemoryRouter>
          </ToastProvider>
        </ThemeContextProvider>
      </Provider>
    );
    const mainPage = screen.getByRole('mainPage');
    expect(mainPage).toBeInTheDocument();
  });

  it('should show loading state', async () => {
    render(
      <Provider store={store}>
        <StrictMode>
          <ErrorBoundary>
            <ThemeContextProvider>
              <ToastProvider>
                <MemoryRouter initialEntries={['/']}>
                  <Routes>
                    <Route path="/" element={<HomePage />} />
                  </Routes>
                </MemoryRouter>
              </ToastProvider>
            </ThemeContextProvider>
          </ErrorBoundary>
        </StrictMode>
      </Provider>
    );

    // Check if the cart page is rendered
    await waitFor(() => {
      expect(screen.getByText('Loading...')).toBeInTheDocument();
    });

    // Additional assertions can be added here to verify detailed card data
  });
  // it('should show error state', async () => {
  //   jest.spyOn(api, 'fetchData').mockImplementation(() => {
  //   return Promise.reject(new Error('Some error occurred'));
  // });
  //   render(
  //     <Provider store={store}>
  //       <StrictMode>
  //         <ErrorBoundary>
  //           <ThemeContextProvider>
  //             <ToastProvider>
  //               <MemoryRouter initialEntries={['/']}>
  //                 <Routes>
  //                   <Route path="/" element={<HomePage />} />
  //                 </Routes>
  //               </MemoryRouter>
  //             </ToastProvider>
  //           </ThemeContextProvider>
  //         </ErrorBoundary>
  //       </StrictMode>
  //     </Provider>
  //   );

  //   // Check if the cart page is rendered
  //   await waitFor(() => {
  //     expect(
  //       screen.getByText(/Some error occurred\. Please try again\./i)
  //     ).toBeInTheDocument();
  //   });

  //   // Additional assertions can be added here to verify detailed card data
  // });

  //

  // it('should show error state', async () => {
  //   mockAxiosAPI.onGet('/characters').reply(500);
  //   render(
  //     <Provider store={store}>
  //       <ThemeContextProvider>
  //         <ToastProvider>
  //           <MemoryRouter initialEntries={['/']}>
  //             <HomePage />
  //           </MemoryRouter>
  //         </ToastProvider>
  //       </ThemeContextProvider>
  //     </Provider>
  //   );

  //   await waitFor(() => {
  //     const errorText = screen.getByText(
  //       'Some error occurred. Please try again.'
  //     );
  //     expect(errorText).toBeInTheDocument();
  //   });
  // });

  // it('should display items not found', async () => {
  //   mockAxiosAPI.onGet('/characters').reply(200, mockFakeResponseNoItems);
  //   render(
  //     <Provider store={store}>
  //       <ThemeContextProvider>
  //         <ToastProvider>
  //           <MemoryRouter initialEntries={['/']}>
  //             <HomePage />
  //           </MemoryRouter>
  //         </ToastProvider>
  //       </ThemeContextProvider>
  //     </Provider>
  //   );

  //   await waitFor(() => {
  //     expect(
  //       screen.getByText(/Some error occurred\. Please try again\./i)
  //     ).toBeInTheDocument();
  //   });
  // });

  // it('should handle delete icon click', async () => {
  //   mockAxiosAPI.onGet('/characters').reply(200, mockFakeResponse);
  //   const preloadedState: RootStateType = {
  //     favorits: { favorits: ['1'] }, // массив строк (или что у вас в `favorits`)
  //     queryParams: {
  //       search: '',
  //       page: '1',
  //       limit: '',
  //       isLoading: false,
  //       error: '',
  //     },
  //     searchParams: {
  //       searchParams: '',
  //       isLoading: false,
  //       error: '',
  //     },
  //     characters: {
  //       response: {
  //         data: [], // здесь важно соответствие типу данных
  //         meta: {
  //           pagination: { current: 1, records: 0 },
  //           copyright: '',
  //           generated_at: '',
  //         },
  //         links: {
  //           self: '',
  //         },
  //       },
  //       status: 'success',
  //       // error: null,
  //     },
  //     character: {
  //       response: {
  //         data: {
  //           id: '',
  //           type: '',
  //           attributes: {
  //             slug: '',
  //             alias_names: [],
  //             animagus: null,
  //             blood_status: null,
  //             boggart: null,
  //             born: null,
  //             died: null,
  //             eye_color: null,
  //             family_members: [],
  //             gender: null,
  //             hair_color: null,
  //             height: null,
  //             house: null,
  //             image: null,
  //             jobs: [],
  //             marital_status: null,
  //             name: '',
  //             nationality: null,
  //             patronus: null,
  //             romances: [],
  //             skin_color: null,
  //             species: null,
  //             titles: [],
  //             wands: [],
  //             weight: null,
  //             wiki: null,
  //           },
  //           links: {
  //             self: '',
  //           },
  //         },
  //         meta: {
  //           pagination: {
  //             current: 1,
  //             records: 0,
  //           },
  //           copyright: 'some copyright',
  //           generated_at: '2025-02-18',
  //         },
  //         links: {
  //           self: '',
  //           current: '',
  //           first: '',
  //           last: '',
  //           next: '',
  //           prev: '',
  //         },
  //       },
  //       status: 'loading',
  //       error: null,
  //     },
  //   };

  //   const store = configureStore({
  //     reducer: {
  //       searchParams: searchParams,
  //       queryParams: queryParams,
  //       // isLoading: isLoading,
  //       favorits: favorits,
  //       character: character,
  //       characters: characters,
  //     },
  //     preloadedState,
  //   });
  //   render(
  //     <Provider store={store}>
  //       <ThemeContextProvider>
  //         <ToastProvider>
  //           <MemoryRouter initialEntries={['/']}>
  //             <HomePage />
  //           </MemoryRouter>
  //         </ToastProvider>
  //       </ThemeContextProvider>
  //     </Provider>
  //   );

  //   // Simulate items being added to favorites
  //   await waitFor(() => {
  //     expect(screen.getByText(/Favorits:\s*\d+/i)).toBeInTheDocument();
  //   });

  //   // Click the delete icon
  //   const deleteIcon = screen.getByLabelText('Trash');
  //   await userEvent.click(deleteIcon);

  //   // Check if toast is shown
  //   await waitFor(() => {
  //     const toastMessage = screen.getByText(
  //       'Successfully deleted all characters!'
  //     );
  //     expect(toastMessage).toBeInTheDocument();
  //   });
  // });

  // it('should shown selected character', async () => {
  //   mockAxiosAPI.onGet('/characters').reply(200, mockFakeResponse);
  //   const preloadedState: RootStateType = {
  //     favorits: { favorits: ['1'] }, // массив строк (или что у вас в `favorits`)
  //     queryParams: {
  //       search: '',
  //       page: '1',
  //       limit: '',
  //       isLoading: false,
  //       error: '',
  //     },
  //     searchParams: {
  //       searchParams: '',
  //       isLoading: false,
  //       error: '',
  //     },
  //     characters: {
  //       response: {
  //         data: [
  //           {
  //             id: '643ae975-0c29-49a7-a87e-d052b798962d',
  //             type: 'character',
  //             attributes: {
  //               slug: 'george-weasley-s-dance-partner',
  //               alias_names: [],
  //               animagus: null,
  //               blood_status: null,
  //               boggart: null,
  //               born: 'Before 1994',
  //               died: null,
  //               eye_color: null,
  //               family_members: [],
  //               gender: 'Female',
  //               hair_color: 'Black',
  //               height: null,
  //               house: null,
  //               image: null,
  //               jobs: [],
  //               marital_status: null,
  //               name: "George Weasley's dance partner",
  //               nationality: null,
  //               patronus: null,
  //               romances: [],
  //               skin_color: 'Light',
  //               species: 'Human',
  //               titles: [],
  //               wands: [],
  //               weight: null,
  //               wiki: "https://harrypotter.fandom.com/wiki/George_Weasley's_dance_partner",
  //             },
  //             links: {
  //               self: '/v1/characters/643ae975-0c29-49a7-a87e-d052b798962d',
  //             },
  //           },
  //           {
  //             id: '49ce06a5-f08b-4475-8e79-72a2b0733c5d',
  //             type: 'character',
  //             attributes: {
  //               slug: 'ginevra-weasley',
  //               alias_names: [
  //                 'Ginny (by family & friends)',
  //                 'Gin (by Harry Potter)',
  //                 'Skinny Ginny (by Ronald Weasley)',
  //               ],
  //               animagus: null,
  //               blood_status: 'Pure-blood',
  //               boggart: 'Lord Voldemort',
  //               born: '11 August 1981, Great Britain',
  //               died: null,
  //               eye_color: 'Bright brown',
  //               family_members: [
  //                 'Arthur Weasley (father)',
  //                 'Molly Weasley (née Prewett) (mother)',
  //                 'William Weasley (older brother)',
  //                 'Charles Weasley (older brother)',
  //                 'Percy Weasley (older brother)',
  //                 'Fred Weasley (older brother) †',
  //                 'George Weasley (older brother)',
  //                 'Ronald Weasley (older brother)',
  //                 'Harry Potter (husband)',
  //                 'James Potter (II) (son)',
  //                 'Albus Potter (son)',
  //                 'Lily Potter (II) (daughter)',
  //                 'James Potter (I) (father-in-law) †',
  //                 'Lily Potter (I) (née Evans) (mother-in-law) †',
  //                 'Fleur Weasley (née Delacour) (sister-in-law)',
  //                 'Audrey Weasley (sister-in-law)',
  //                 'Angelina Weasley (née Johnson) (sister-in-law)',
  //                 'Hermione Granger (sister-in-law)',
  //                 'Padma Patil (sister-in-law in alternate timeline)',
  //                 'Victoire Weasley (niece)',
  //                 'Dominique Weasley (niece)',
  //                 'Louis Weasley (nephew)',
  //                 'Molly Weasley (II) (niece)',
  //                 'Lucy Weasley (niece)',
  //                 'Fred Weasley (II) (nephew)',
  //                 'Roxanne Weasley (niece)',
  //                 'Rose Granger-Weasley (niece)',
  //                 'Hugo Granger-Weasley (nephew)',
  //                 'Panju Weasley (nephew in alternate timeline)',
  //                 'Two paternal uncles',
  //                 'Fabian Prewett (maternal uncle) †',
  //                 'Gideon Prewett (maternal uncle) †',
  //                 'Bilius (uncle or uncle by marriage) †',
  //                 'Uncle or uncle by marriage',
  //                 'First cousin',
  //                 'Septimus Weasley (paternal grandfather)',
  //                 'Cedrella Weasley (née Black) (paternal grandmother)',
  //                 'Maternal grandfather',
  //                 'Matilda Weasley (possible relative)',
  //                 'G. Weasley (possible relative)',
  //                 'Garreth Weasley (possible relative)',
  //                 'Possible relative',
  //                 'Possible relatives',
  //                 'Hector Weasley (possible relative)',
  //                 'Weasley family (paternal family)',
  //                 'Prewett family (maternal family)',
  //                 'Potter family (in-laws/descendants)',
  //               ],
  //               gender: 'Female',
  //               hair_color: 'Red',
  //               height: null,
  //               house: 'Gryffindor',
  //               image:
  //                 'https://static.wikia.nocookie.net/harrypotter/images/8/8b/Ginny_Weasley_hbp_promo.jpg',
  //               jobs: [
  //                 'Chaser for the Holyhead Harpies (formerly)',
  //                 'Senior Quidditch Correspondent for the Daily Prophet (formerly)',
  //                 'Sports editor for the Daily Prophet',
  //               ],
  //               marital_status: 'Married',
  //               name: 'Ginevra Molly Potter (née Weasley)',
  //               nationality: 'English',
  //               patronus: 'Horse',
  //               romances: [
  //                 'Dean Thomas (ex-boyfriend)',
  //                 'Michael Corner (ex-boyfriend)',
  //                 'Harry Potter (husband)',
  //               ],
  //               skin_color: null,
  //               species: 'Human',
  //               titles: ['Chaser', 'Seeker'],
  //               wands: ['Yew, unknown length, unknown core'],
  //               weight: null,
  //               wiki: 'https://harrypotter.fandom.com/wiki/Ginevra_Weasley',
  //             },
  //             links: {
  //               self: '/v1/characters/49ce06a5-f08b-4475-8e79-72a2b0733c5d',
  //             },
  //           },
  //           {
  //             id: 'fb23534e-a109-4378-9966-29c3cde37711',
  //             type: 'character',
  //             attributes: {
  //               slug: 'g-weasley',
  //               alias_names: [],
  //               animagus: null,
  //               blood_status: 'Pure-blood',
  //               boggart: null,
  //               born: 'Before 1875',
  //               died: null,
  //               eye_color: null,
  //               family_members: [
  //                 'Matilda Weasley (sister)',
  //                 'Garreth Weasley (son)',
  //                 'Daughter',
  //                 'Sons and/or nephews',
  //                 'Hector Weasley (possibly)',
  //                 'Weasley family',
  //               ],
  //               gender: 'Male',
  //               hair_color: null,
  //               height: null,
  //               house: null,
  //               image: null,
  //               jobs: [],
  //               marital_status: null,
  //               name: 'G. Weasley',
  //               nationality: 'British',
  //               patronus: null,
  //               romances: [],
  //               skin_color: null,
  //               species: 'Human',
  //               titles: [],
  //               wands: [],
  //               weight: null,
  //               wiki: 'https://harrypotter.fandom.com/wiki/G._Weasley',
  //             },
  //             links: {
  //               self: '/v1/characters/fb23534e-a109-4378-9966-29c3cde37711',
  //             },
  //           },
  //           {
  //             id: 'bea151de-327a-48f8-bd77-2949f727d59e',
  //             type: 'character',
  //             attributes: {
  //               slug: 'g-weasley-s-neighbour',
  //               alias_names: [],
  //               animagus: null,
  //               blood_status: null,
  //               boggart: null,
  //               born: 'Pre 1890',
  //               died: null,
  //               eye_color: null,
  //               family_members: [],
  //               gender: null,
  //               hair_color: null,
  //               height: null,
  //               house: null,
  //               image: null,
  //               jobs: [],
  //               marital_status: null,
  //               name: "G. Weasley's neighbour",
  //               nationality: null,
  //               patronus: null,
  //               romances: [],
  //               skin_color: null,
  //               species: 'Human',
  //               titles: [],
  //               wands: [],
  //               weight: null,
  //               wiki: "https://harrypotter.fandom.com/wiki/G._Weasley's_neighbour",
  //             },
  //             links: {
  //               self: '/v1/characters/bea151de-327a-48f8-bd77-2949f727d59e',
  //             },
  //           },
  //           {
  //             id: '3834aca6-adb5-48e8-988e-9dece43fb996',
  //             type: 'character',
  //             attributes: {
  //               slug: 'hector-weasley',
  //               alias_names: [],
  //               animagus: null,
  //               blood_status: null,
  //               boggart: null,
  //               born: 'Between 1 September 1872 and 31 August 1879',
  //               died: null,
  //               eye_color: null,
  //               family_members: [
  //                 'Matilda Weasley (possibly)',
  //                 'G. Weasley (possibly)',
  //                 'Garreth Weasley (possibly)',
  //                 "Garreth Weasley's sister (possibly)",
  //                 "Matilda Weasley's nephews (possibly)",
  //                 'Weasley family',
  //               ],
  //               gender: 'Male',
  //               hair_color: 'Red',
  //               height: null,
  //               house: 'Gryffindor',
  //               image: null,
  //               jobs: [],
  //               marital_status: null,
  //               name: 'Hector Weasley',
  //               nationality: 'British or Irish',
  //               patronus: null,
  //               romances: [],
  //               skin_color: 'Light',
  //               species: 'Human',
  //               titles: [],
  //               wands: [],
  //               weight: null,
  //               wiki: 'https://harrypotter.fandom.com/wiki/Hector_Weasley',
  //             },
  //             links: {
  //               self: '/v1/characters/3834aca6-adb5-48e8-988e-9dece43fb996',
  //             },
  //           },
  //           {
  //             id: '6d53584a-bfbe-446c-8966-74f681e1902c',
  //             type: 'character',
  //             attributes: {
  //               slug: 'hugo-granger-weasley',
  //               alias_names: [],
  //               animagus: null,
  //               blood_status: 'Half-blood',
  //               boggart: null,
  //               born: 'Between 1 September 2007 and 31 August 2008 (possibly)',
  //               died: null,
  //               eye_color: null,
  //               family_members: [
  //                 'Ronald Weasley (father)',
  //                 'Hermione Granger (mother)',
  //                 'Rose Granger-Weasley (older sister)',
  //                 'William Weasley (paternal uncle)',
  //                 'Charles Weasley (paternal uncle)',
  //                 'Percy Weasley (paternal uncle)',
  //                 'Fred Weasley (paternal uncle) †',
  //                 'George Weasley (paternal uncle)',
  //                 'Ginevra Potter (née Weasley) (paternal aunt)',
  //                 'Fleur Weasley (née Delacour) (paternal aunt by marriage)',
  //                 'Audrey Weasley (paternal aunt by marriage)',
  //                 'Angelina Weasley (née Johnson) (paternal aunt by marriage)',
  //                 'Harry Potter (paternal uncle by marriage)',
  //                 'Victoire Weasley (paternal first cousin)',
  //                 'Louis Weasley (paternal first cousin)',
  //                 'Dominique Weasley (paternal first cousin)',
  //                 'Molly Weasley (II) (paternal first cousin)',
  //                 'Lucy Weasley (paternal first cousin)',
  //                 'Fred Weasley (II) (paternal first cousin)',
  //                 'Roxanne Weasley (paternal first cousin)',
  //                 'James Potter (II) (paternal first cousin)',
  //                 'Albus Potter (paternal first cousin)',
  //                 'Lily Potter (II) (paternal first cousin)',
  //                 'Arthur Weasley (paternal grandfather)',
  //                 'Molly Weasley (née Prewett) (paternal grandmother)',
  //                 'Maternal grandfather',
  //                 'Maternal grandfather',
  //                 'Matilda Weasley (possible relative)',
  //                 'G. Weasley (possible relative)',
  //                 'Garreth Weasley (possible relative)',
  //                 'Possible relative',
  //                 'Possible relatives',
  //                 'Hector Weasley (possible relative)',
  //                 'Hector Dagworth-Granger (possible relative)',
  //                 'Granger-Weasley family',
  //                 'Weasley family (paternal family)',
  //                 'Granger family (maternal family)',
  //               ],
  //               gender: 'Male',
  //               hair_color: 'Brown',
  //               height: null,
  //               house: null,
  //               image:
  //                 'https://static.wikia.nocookie.net/harrypotter/images/6/63/Harry-potter-hugo.jpg',
  //               jobs: [],
  //               marital_status: null,
  //               name: 'Hugo Granger-Weasley',
  //               nationality: 'British',
  //               patronus: null,
  //               romances: [],
  //               skin_color: null,
  //               species: 'Human',
  //               titles: [],
  //               wands: [],
  //               weight: null,
  //               wiki: 'https://harrypotter.fandom.com/wiki/Hugo_Granger-Weasley',
  //             },
  //             links: {
  //               self: '/v1/characters/6d53584a-bfbe-446c-8966-74f681e1902c',
  //             },
  //           },
  //           {
  //             id: 'd831f987-3ddc-48f5-9043-2a1533987733',
  //             type: 'character',
  //             attributes: {
  //               slug: 'louis-weasley',
  //               alias_names: [],
  //               animagus: null,
  //               blood_status: 'Half-breed (one-eighth-Veela)',
  //               boggart: null,
  //               born: 'After 2 May 2000',
  //               died: null,
  //               eye_color: null,
  //               family_members: [
  //                 'William Weasley (father)',
  //                 'Fleur Weasley (née Delacour) (mother)',
  //                 'Victoire Weasley (older sister)',
  //                 'Dominique Weasley (older sister)',
  //                 'Charles Weasley (paternal uncle)',
  //                 'Percy Weasley (paternal uncle)',
  //                 'Fred Weasley (paternal uncle) †',
  //                 'George Weasley (paternal uncle)',
  //                 'Ronald Weasley (paternal uncle)',
  //                 'Ginevra Potter (née Weasley) (paternal aunt)',
  //                 'Gabrielle Delacour (maternal aunt)',
  //                 'Audrey Weasley (paternal aunt by marriage)',
  //                 'Angelina Weasley (née Johnson) (paternal aunt by marriage)',
  //                 'Hermione Granger (paternal aunt by marriage)',
  //                 'Harry Potter (paternal uncle by marriage)',
  //                 'Padma Patil (paternal aunt by marriage in alternate timeline)',
  //                 'Molly Weasley (II) (paternal first cousin)',
  //                 'Lucy Weasley (paternal first cousin)',
  //                 'Fred Weasley (II) (paternal first cousin)',
  //                 'Roxanne Weasley (paternal first cousin)',
  //                 'Rose Granger-Weasley (paternal first cousin)',
  //                 'Hugo Granger-Weasley (paternal first cousin)',
  //                 'James Potter (II) (paternal first cousin)',
  //                 'Albus Potter (paternal first cousin)',
  //                 'Lily Potter (II) (paternal first cousin)',
  //                 'Panju Weasley (paternal first cousin in alternate timeline)',
  //                 'Arthur Weasley (paternal grandfather)',
  //                 'Molly Weasley (née Prewett) (paternal grandmother)',
  //                 'Maternal grandfather',
  //                 'Apolline Delacour (maternal grandmother)',
  //                 'Matilda Weasley (possible relative)',
  //                 'G. Weasley (possible relative)',
  //                 'Garreth Weasley (possible relative)',
  //                 'Possible relative',
  //                 'Possible relatives',
  //                 'Hector Weasley (possible relative)',
  //                 'Weasley family (paternal family)',
  //                 'Delacour family (maternal family)',
  //               ],
  //               gender: 'Male',
  //               hair_color: null,
  //               height: null,
  //               house: null,
  //               image:
  //                 'https://static.wikia.nocookie.net/harrypotter/images/a/af/LouisWeasley.png',
  //               jobs: [],
  //               marital_status: null,
  //               name: 'Louis Weasley',
  //               nationality: 'British or Irish',
  //               patronus: null,
  //               romances: [],
  //               skin_color: null,
  //               species: 'Part-human/one-eighth-Veela',
  //               titles: [],
  //               wands: [],
  //               weight: null,
  //               wiki: 'https://harrypotter.fandom.com/wiki/Louis_Weasley',
  //             },
  //             links: {
  //               self: '/v1/characters/d831f987-3ddc-48f5-9043-2a1533987733',
  //             },
  //           },
  //           {
  //             id: '44b45b4b-28fa-491e-935e-7e602893bb99',
  //             type: 'character',
  //             attributes: {
  //               slug: 'lucy-weasley',
  //               alias_names: [],
  //               animagus: null,
  //               blood_status: 'Pure-blood, half-blood or Squib',
  //               boggart: null,
  //               born: 'After 2 May 2000',
  //               died: null,
  //               eye_color: null,
  //               family_members: [
  //                 'Percy Weasley (father)',
  //                 'Audrey Weasley (mother)',
  //                 'Molly Weasley (II) (older sister)',
  //                 'William Weasley (paternal uncle)',
  //                 'Charles Weasley (paternal uncle)',
  //                 'Fred Weasley (paternal uncle) †',
  //                 'George Weasley (paternal uncle)',
  //                 'Ronald Weasley (paternal uncle)',
  //                 'Ginevra Potter (née Weasley) (paternal aunt)',
  //                 'Fleur Weasley (née Delacour) (paternal aunt by marriage)',
  //                 'Angelina Weasley (née Johnson) (paternal aunt by marriage)',
  //                 'Hermione Granger (paternal aunt by marriage)',
  //                 'Harry Potter (paternal uncle by marriage)',
  //                 'Padma Patil (paternal aunt by marriage in alternate timeline)',
  //                 'Victoire Weasley (paternal first cousin)',
  //                 'Dominique Weasley (paternal first cousin)',
  //                 'Louis Weasley (paternal first cousin)',
  //                 'Fred Weasley (II) (paternal first cousin)',
  //                 'Roxanne Weasley (paternal first cousin)',
  //                 'Rose Granger-Weasley (paternal first cousin)',
  //                 'Hugo Granger-Weasley (paternal first cousin)',
  //                 'James Potter (II) (paternal first cousin)',
  //                 'Albus Potter (paternal first cousin)',
  //                 'Lily Potter (II) (paternal first cousin)',
  //                 'Panju Weasley (paternal first cousin in alternate timeline)',
  //                 'Arthur Weasley (paternal grandfather)',
  //                 'Molly Weasley (née Prewett) (paternal grandmother)',
  //                 'Matilda Weasley (possible relative)',
  //                 'G. Weasley (possible relative)',
  //                 'Garreth Weasley (possible relative)',
  //                 'Possible relative',
  //                 'Possible relatives',
  //                 'Hector Weasley (possible relative)',
  //                 'Weasley family',
  //               ],
  //               gender: 'Female',
  //               hair_color: null,
  //               height: null,
  //               house: null,
  //               image:
  //                 'https://static.wikia.nocookie.net/harrypotter/images/5/50/LucyWeasley.png',
  //               jobs: [],
  //               marital_status: null,
  //               name: 'Lucy Weasley',
  //               nationality: null,
  //               patronus: null,
  //               romances: [],
  //               skin_color: null,
  //               species: 'Human',
  //               titles: [],
  //               wands: [],
  //               weight: null,
  //               wiki: 'https://harrypotter.fandom.com/wiki/Lucy_Weasley',
  //             },
  //             links: {
  //               self: '/v1/characters/44b45b4b-28fa-491e-935e-7e602893bb99',
  //             },
  //           },
  //         ],
  //         meta: {
  //           pagination: {
  //             current: 3,
  //             first: 1,
  //             prev: 2,
  //             next: 4,
  //             last: 7,
  //             records: 53,
  //           },
  //           copyright: 'Copyright © Potter DB 2025',
  //           generated_at: '2024-10-21T09:31:38.256Z',
  //         },
  //         links: {
  //           self: 'https://api.potterdb.com/v1/characters?page[size]=8&page[number]=3&filter[name_cont_any]=Weasley',
  //           current:
  //             'https://api.potterdb.com/v1/characters?filter[name_cont_any]=Weasley&page[number]=3&page[size]=8',
  //           first:
  //             'https://api.potterdb.com/v1/characters?filter[name_cont_any]=Weasley&page[number]=1&page[size]=8',
  //           prev: 'https://api.potterdb.com/v1/characters?filter[name_cont_any]=Weasley&page[number]=2&page[size]=8',
  //           next: 'https://api.potterdb.com/v1/characters?filter[name_cont_any]=Weasley&page[number]=4&page[size]=8',
  //           last: 'https://api.potterdb.com/v1/characters?filter[name_cont_any]=Weasley&page[number]=7&page[size]=8',
  //         },
  //       },
  //       status: 'success',
  //       // error: null,
  //     },
  //     character: {
  //       response: {
  //         data: {
  //           id: '',
  //           type: '',
  //           attributes: {
  //             slug: '',
  //             alias_names: [],
  //             animagus: null,
  //             blood_status: null,
  //             boggart: null,
  //             born: null,
  //             died: null,
  //             eye_color: null,
  //             family_members: [],
  //             gender: null,
  //             hair_color: null,
  //             height: null,
  //             house: null,
  //             image: null,
  //             jobs: [],
  //             marital_status: null,
  //             name: '',
  //             nationality: null,
  //             patronus: null,
  //             romances: [],
  //             skin_color: null,
  //             species: null,
  //             titles: [],
  //             wands: [],
  //             weight: null,
  //             wiki: null,
  //           },
  //           links: {
  //             self: '',
  //           },
  //         },
  //         meta: {
  //           pagination: {
  //             current: 1,
  //             records: 0,
  //           },
  //           copyright: 'some copyright',
  //           generated_at: '2025-02-18',
  //         },
  //         links: {
  //           self: '',
  //           current: '',
  //           first: '',
  //           last: '',
  //           next: '',
  //           prev: '',
  //         },
  //       },
  //       status: 'loading',
  //       error: null,
  //     },
  //   };

  //   const store = configureStore({
  //     reducer: {
  //       searchParams: searchParams,
  //       queryParams: queryParams,
  //       // isLoading: isLoading,
  //       favorits: favorits,
  //       character: character,
  //       characters: characters,
  //     },
  //     preloadedState,
  //   });
  //   render(
  //     <Provider store={store}>
  //       <ThemeContextProvider>
  //         <ToastProvider>
  //           <MemoryRouter initialEntries={['/']}>
  //             <HomePage />
  //           </MemoryRouter>
  //         </ToastProvider>
  //       </ThemeContextProvider>
  //     </Provider>
  //   );
  //   const link = screen.getByTestId(
  //     'link-49ce06a5-f08b-4475-8e79-72a2b0733c5d'
  //   );
  //   await userEvent.click(link);
  //   console.log(store.getState().character.response.data.id);

  //   // Check if toast is shown
  //   await waitFor(
  //     () => {
  //       const cartId = store.getState().character.response.data.id;
  //       expect(cartId).toBe('49ce06a5-f08b-4475-8e79-72a2b0733c5d');
  //     },
  //     { timeout: 3000 }
  //   );
  // });
  // it('should handle download icon click', async () => {
  //   mockAxiosAPI.onGet('/characters').reply(200, mockFakeResponse);
  //   const preloadedState: RootStateType = {
  //     favorits: { favorits: ['1'] }, // массив строк (или что у вас в `favorits`)
  //     queryParams: {
  //       search: '',
  //       page: '1',
  //       limit: '',
  //       isLoading: false,
  //       error: '',
  //     },
  //     searchParams: {
  //       searchParams: '',
  //       isLoading: false,
  //       error: '',
  //     },
  //     characters: {
  //       response: {
  //         data: [], // здесь важно соответствие типу данных
  //         meta: {
  //           pagination: { current: 1, records: 0 },
  //           copyright: '',
  //           generated_at: '',
  //         },
  //         links: {
  //           self: '',
  //         },
  //       },
  //       status: 'success',
  //       // error: null,
  //     },
  //     character: {
  //       response: {
  //         data: {
  //           id: '',
  //           type: '',
  //           attributes: {
  //             slug: '',
  //             alias_names: [],
  //             animagus: null,
  //             blood_status: null,
  //             boggart: null,
  //             born: null,
  //             died: null,
  //             eye_color: null,
  //             family_members: [],
  //             gender: null,
  //             hair_color: null,
  //             height: null,
  //             house: null,
  //             image: null,
  //             jobs: [],
  //             marital_status: null,
  //             name: '',
  //             nationality: null,
  //             patronus: null,
  //             romances: [],
  //             skin_color: null,
  //             species: null,
  //             titles: [],
  //             wands: [],
  //             weight: null,
  //             wiki: null,
  //           },
  //           links: {
  //             self: '',
  //           },
  //         },
  //         meta: {
  //           pagination: {
  //             current: 1,
  //             records: 0,
  //           },
  //           copyright: 'some copyright',
  //           generated_at: '2025-02-18',
  //         },
  //         links: {
  //           self: '',
  //           current: '',
  //           first: '',
  //           last: '',
  //           next: '',
  //           prev: '',
  //         },
  //       },
  //       status: 'loading',
  //       error: null,
  //     },
  //   };

  //   const store = configureStore({
  //     reducer: {
  //       searchParams: searchParams,
  //       queryParams: queryParams,
  //       // isLoading: isLoading,
  //       favorits: favorits,
  //       character: character,
  //       characters: characters,
  //     },
  //     preloadedState,
  //   });
  //   render(
  //     <Provider store={store}>
  //       <ThemeContextProvider>
  //         <ToastProvider>
  //           <MemoryRouter initialEntries={['/']}>
  //             <HomePage />
  //           </MemoryRouter>
  //         </ToastProvider>
  //       </ThemeContextProvider>
  //     </Provider>
  //   );

  //   // Simulate items being added to favorites
  //   await waitFor(() => {
  //     expect(screen.getByText(/Favorits:\s*\d+/i)).toBeInTheDocument();
  //   });

  //   // Click the delete icon
  //   const downloadIcon = screen.getByLabelText('Download');
  //   await userEvent.click(downloadIcon);

  //   // Check if toast is shown
  //   await waitFor(() => {
  //     const toastMessage = screen.getByText('Файл успешно скачан!');
  //     expect(toastMessage).toBeInTheDocument();
  //   });
  // });

  // it('should handle download icon click', async () => {
  //   mockAxiosAPI.onGet('/characters').reply(200, mockFakeResponse);
  //   render(
  //     <Provider store={store}>
  //       <ThemeContextProvider>
  //         <ToastProvider>
  //           <MemoryRouter initialEntries={['/']}>
  //             <HomePage />
  //           </MemoryRouter>
  //         </ToastProvider>
  //       </ThemeContextProvider>
  //     </Provider>
  //   );

  //   // Simulate items being added to favorites
  //   await waitFor(() => {
  //     const favoritsText = screen.getByText(/Favorits:/);
  //     expect(favoritsText).toBeInTheDocument();
  //   });

  //   // Click the download icon
  //   const downloadIcon = screen.getByLabelText('Download');
  //   fireEvent.click(downloadIcon);

  //   // Check if toast is shown
  //   await waitFor(() => {
  //     const toastMessage = screen.getByText('Файл успешно скачан!');
  //     expect(toastMessage).toBeInTheDocument();
  //   });
  // });
});
// Мокаем хук useGetCharactersQuery
// vi.mock('../../api/redux.api', () => {
//   return {
//     ...vi.importActual('../../api/redux.api'), // Импортируем оригинальные экспорты
//     useGetCharactersQuery: vi.fn(), // Мокаем только нужный хук
//   };
// });

// describe('HomePage', () => {
//   it('should show error state', async () => {
//     // Настраиваем мок, чтобы он возвращал ошибку
//     (api.useGetCharactersQuery as jest.Mock).mockReturnValue({
//       data: null,
//       error: new Error('Some error occurred'),
//       isFetching: false,
//       refetch: vi.fn(),
//     });

//     render(
//       <Provider store={store}>
//         <MemoryRouter initialEntries={['/']}>
//           <Routes>
//             <Route path="/" element={<HomePage />} />
//           </Routes>
//         </MemoryRouter>
//       </Provider>
//     );

//     // Ожидаем, что сообщение об ошибке появится в документе
//     await waitFor(() => {
//       expect(
//         screen.getByText(/Some error occurred\. Please try again\./i)
//       ).toBeInTheDocument();
//     });
//   });
// });
