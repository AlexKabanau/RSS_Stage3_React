'use client';

import React from 'react';
import { GetCharacterType, ResponseInfoType } from '@/api/getItems';
import CharacterDetails from './CharacterDetails';
import HomePageComponent from './HomePageComponent';

export default function CartDetailsPage({
  cards,
  character,
}: {
  cards: ResponseInfoType;
  character: GetCharacterType;
}) {
  if (!cards || !cards.data) {
    return <p>Ошибка загрузки данных HomePage</p>;
  }

  return (
    <div role="homePage" className="main-container">
      <HomePageComponent cards={cards} className={'width2_3'} />
      <CharacterDetails characterData={character} />
    </div>
  );
}
