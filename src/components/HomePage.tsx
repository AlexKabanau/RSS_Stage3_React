import React from 'react';
import { ResponseInfoType } from '@/api/getItems';
import Layout from '@/pages/layout';

export default function HomePage({ cards }: { cards: ResponseInfoType }) {
  if (!cards || !cards.data) {
    return <p>Ошибка загрузки данных HomePage</p>;
  }
  const newData = cards;
  return <Layout data={newData} />;
}
