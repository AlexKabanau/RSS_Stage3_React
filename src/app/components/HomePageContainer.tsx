import React from 'react';
import { getCharacters } from '@/store/api/characterApi';
import { checkRouterElement } from '@/utils/checkRouterElement';
// import HomePage from '@/app/HomePage';
import { store } from '@/store/store';
import HomePage from './HomePage';
// import HomePage from './HomePage';

type Props = {
  searchParams: { page?: string; search?: string };
};

export default async function HomePageContainer({ searchParams }: Props) {
  const { page = '1', search = '' } = await searchParams;
  await new Promise((resolve) => setTimeout(resolve, 5000));
  const initialCards = await store.dispatch(
    getCharacters.initiate({
      page: checkRouterElement(page, '1'),
      searchParams: checkRouterElement(search, ''),
    })
  );

  if (initialCards.data) {
    return <HomePage cards={initialCards.data} />;
  }

  return null;
}
