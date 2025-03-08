import React from 'react';
import { checkRouterElement } from '@/utils/checkRouterElement';
import { getCharacter, getCharacters } from '@/store/api/characterApi';
import { store } from '@/store/store';
import CartDetailsPage from '@/app/components/CartDetailsPage';

type Props = {
  params: { id: string };
  searchParams: { page?: string; search?: string };
};

export default async function CharacterPage({ params, searchParams }: Props) {
  const { page = '1', search = '' } = await searchParams;
  const { id } = await params;
  const initialCards = await store.dispatch(
    getCharacters.initiate({
      page: checkRouterElement(page, '1'),
      searchParams: checkRouterElement(search, ''),
    })
  );
  const character = await store.dispatch(
    getCharacter.initiate({ id: checkRouterElement(id, '') })
  );

  if (!initialCards) {
    return <p>Ошибка загрузки данных.</p>;
  }
  if (initialCards.data && character.data) {
    return (
      <CartDetailsPage cards={initialCards.data} character={character.data} />
    );
  }
}
