import React from 'react';
import { ResponseInfoType } from '@/api/getItems';
import HomePageComponent from './HomePageComponent';

export default function HomePage({ cards }: { cards: ResponseInfoType }) {
  return (
    <div role="homePage" className="main-container">
      <HomePageComponent cards={cards} className={'fullWidth'} />
    </div>
  );
}
