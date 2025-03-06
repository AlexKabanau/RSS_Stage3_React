import React from 'react';
// import { getCharacters } from '@/store/api/characterApi';
// import { checkRouterElement } from '@/utils/checkRouterElement';
// import HomePage from '@/app/components/HomePage';
// import { store } from '@/store/store';
import HomePageContainer from './components/HomePageContainer';

export default function Page({
  searchParams,
}: {
  searchParams: { page?: string; search?: string };
}) {
  console.log('Page component rendered');
  return <HomePageContainer searchParams={searchParams} />;
}

// type Props = {
//   searchParams: { page?: string; search?: string };
// };

// async function HomePageContainer({ searchParams }: Props) {
//   const { page = '1', search = '' } = await searchParams;

//   const initialCardsPromise = store.dispatch(
//     getCharacters.initiate({
//       page: checkRouterElement(page, '1'),
//       searchParams: checkRouterElement(search, ''),
//     })
//   );
//   const initialCards = await initialCardsPromise;

//   if (!initialCards.data) {
//     return <p>Загрузка...</p>; // Серверный лоадер
//   }

//   if (initialCards.data) {
//     return <HomePage cards={initialCards.data} />;
//   }

//   return null;
// }
