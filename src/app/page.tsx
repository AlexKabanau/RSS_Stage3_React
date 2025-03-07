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
  // if (!searchParams.page) {
  //   searchParams.page.
  // }
  // const page = searchParams.page || '1';
  // const search = searchParams.search || '';

  // Запрашиваем данные
  const initialCardsPromise = store.dispatch(
    getCharacters.initiate({
      page: checkRouterElement(page, '1'),
      searchParams: checkRouterElement(search, ''),
    })
  );
  // const character = await store.dispatch(
  //   getCharacter.initiate({ id: checkRouterElement(id, '') })
  // );

  // Пока данные загружаются, показываем "Loading..."
  const initialCards = await initialCardsPromise;

  // console.log(initialCards);

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
