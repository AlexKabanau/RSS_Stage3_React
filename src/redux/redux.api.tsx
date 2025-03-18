import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { Country } from './slices/countriesSlice';

export const countriesApi = createApi({
  reducerPath: 'countriesApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://restcountries.com/v3.1/' }),
  endpoints: (builder) => ({
    getAllCountries: builder.query<Country[], string>({
      query: () => 'all',
    }),
  }),
});

export const { useGetAllCountriesQuery } = countriesApi;
