import { GetCharacterType, ResponseInfoType } from '@/api/getItems';
import { RESOURCES_PER_PAGE, URL } from '@/constants/constants';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { HYDRATE } from 'next-redux-wrapper';

export type CharacterResponseType = {
  response: GetCharacterType;
};

export const reduxApi = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({ baseUrl: URL.baseUrl }),
  extractRehydrationInfo(action, { reducerPath }) {
    if (action.type === HYDRATE) {
      return action.payload[reducerPath];
    }
  },
  endpoints: (builder) => ({
    getCharacter: builder.query<GetCharacterType, { id: string }>({
      query: ({ id }) => `${URL.props}/${id}`,
    }),
    getCharacters: builder.query<
      ResponseInfoType,
      { searchParams: string; page: string }
    >({
      query: ({ searchParams, page }) =>
        `${URL.props}${URL.ammount}${RESOURCES_PER_PAGE}${URL.currentPage}${page}${URL.search}${searchParams}`,
    }),
  }),
});

export const { getCharacter, getCharacters } = reduxApi.endpoints;

export const { useGetCharacterQuery, useGetCharactersQuery } = reduxApi;
