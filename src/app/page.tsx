import React from 'react';
import { getCharacters } from '@/store/api/characterApi';
import { checkRouterElement } from '@/utils/checkRouterElement';
import HomePage from '@/app/components/HomePage';
import { store } from '@/store/store';

type Props = {
  searchParams: { page?: string; search?: string };
};

export default async function HomePageContainer({ searchParams }: Props) {
  const { page = '1', search = '' } = await searchParams;
  const initialCardsPromise = store.dispatch(
    getCharacters.initiate({
      page: checkRouterElement(page, '1'),
      searchParams: checkRouterElement(search, ''),
    })
  );
  const initialCards = await initialCardsPromise;

  if (initialCards.isLoading) {
    return <p>Loading...</p>;
  }

  if (initialCards.isError) {
    return <p>Ошибка загрузки данных.</p>;
  }

  if (initialCards.data) {
    return <HomePage cards={initialCards.data} />;
  }

  return null;
}
