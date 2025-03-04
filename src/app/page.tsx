import React from 'react';
import {
  getCharacters, // getCharacters,
  // reduxApi,
  // useGetCharactersQuery,
} from '@/store/api/characterApi';
// import { wrapper } from '@/store/store';
import { checkRouterElement } from '@/utils/checkRouterElement';
// import HomePage from '@/components/HomePage';
// import reactLogo from '../../public/react.svg';
import { ResponseInfoType } from '@/api/getItems';
import HomePage from '@/app/components/HomePage';
import { store } from '@/store/store';

type Props = {
  searchParams: { page?: string; search?: string };
};

// async function getData(
//   page: string,
//   search: string
// ): Promise<ResponseInfoType | null> {
//   try {
//     const response = await fetch(
//       `${process.env.NEXT_PUBLIC_API_URL}/characters?page=${checkRouterElement(page, '1')}&search=${checkRouterElement(search, '')}`
//     );

//     if (!response.ok) throw new Error('Ошибка загрузки данных');

//     return response.json();
//   } catch (error) {
//     console.error('Ошибка при загрузке:', error);
//     return null;
//   }
// }

export default async function HomePageContainer({ searchParams }: Props) {
  const { page = '1', search = '' } = searchParams;
  const initialCards = await store.dispatch(
    getCharacters.initiate({
      page: checkRouterElement(page, '1'),
      searchParams: checkRouterElement(search, ''),
    })
  );

  if (!initialCards) {
    return <p>Ошибка загрузки данных.</p>;
  }

  // if (isLoading || !cards) {
  //   return (
  //     <div>
  //       <p>Loading...</p>
  //       <img src={reactLogo.src} className="logo" alt="loading" />
  //     </div>
  //   );
  // }

  // if (error) {
  //   console.error('Error loading data:', error);
  //   return <p>Ошибка загрузки данных.</p>;
  // }

  return <HomePage cards={initialCards.data} />;
  // return <>{JSON.stringify(initialCards.data)}</>;
}
