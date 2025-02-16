// import axios, { AxiosError, AxiosRequestConfig } from 'axios';

import {
  DEFAULT_CURRENT_PAGE,
  // DEFAULT_CURRENT_PAGE,
  RESOURCES_PER_PAGE,
  URL,
} from '../constants/constants';
import {
  // BaseQueryFn,
  createApi,
  // EndpointBuilder,
  // EndpointDefinitions,
  fetchBaseQuery,
} from '@reduxjs/toolkit/query/react';
import { GetCharacterType, ResponseInfoType } from './getItems';

// const axiosBaseQuery =
//   (
//     { baseUrl }: { baseUrl: string } = { baseUrl: '' }
//   ): BaseQueryFn<
//     {
//       url: string;
//       method?: AxiosRequestConfig['method'];
//       data?: AxiosRequestConfig['data'];
//       params?: AxiosRequestConfig['params'];
//       headers?: AxiosRequestConfig['headers'];
//     },
//     unknown,
//     unknown
//   > =>
//   async ({ url, method, data, params, headers }) => {
//     try {
//       const result = await axios({
//         url: baseUrl + url,
//         method,
//         data,
//         params,
//         headers,
//       });
//       return { data: result.data };
//     } catch (axiosError) {
//       const err = axiosError as AxiosError;
//       return {
//         error: {
//           status: err.response?.status,
//           data: err.response?.data || err.message,
//         },
//       };
//     }
//   };

export const reduxApi = createApi({
  reducerPath: 'api/characters',
  baseQuery: fetchBaseQuery({
    baseUrl: URL.baseUrl,
  }),
  endpoints: (build) => ({
    getItems: build.query<ResponseInfoType, { params: string; page: number }>({
      query: ({ params, page = DEFAULT_CURRENT_PAGE }) => {
        return `${URL.baseUrl}${URL.props}${URL.ammount}${RESOURCES_PER_PAGE}${URL.currentPage}${page}${URL.search}${params}`;
      },
      transformResponse: (response: ResponseInfoType) => ({
        data: response.data,
        meta: response.meta,
        links: response.links,
      }),
    }),
    getCharacter: build.query<{ response: GetCharacterType }, { id: string }>({
      query: ({ id }) => `${URL.props}/${id}`,
    }),
  }),
});

export const { useGetItemsQuery, useGetCharacterQuery } = reduxApi;
