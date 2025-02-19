import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { GetCharacterType, ResponseInfoType } from './getItems';
import { RESOURCES_PER_PAGE, URL } from '../constants/constants';
// import { URL } from '';

export const api = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({ baseUrl: URL.baseUrl }),
  endpoints: (builder) => ({
    getCharacter: builder.query<GetCharacterType, string>({
      query: (id) => `${URL.props}/${id}`,
    }),
    getCharacters: builder.query<
      ResponseInfoType,
      { searchParams: string; page: number }
    >({
      query: ({ searchParams, page }) =>
        `${URL.props}${URL.ammount}${RESOURCES_PER_PAGE}${URL.currentPage}${page}${URL.search}${searchParams}`,
    }),
  }),
});

export const { useGetCharacterQuery, useGetCharactersQuery } = api;
