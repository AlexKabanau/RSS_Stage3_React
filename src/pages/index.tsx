// import { getCharacters } from '@/api/getItems';
import React from 'react';
import { getCharacters, reduxApi } from '@/store/api/characterApi';
import { wrapper } from '@/store/store';
import Layout from './layout';
import { ResponseInfoType } from '@/api/getItems';
import { checkRouterElement } from '@/utils/checkRouterElement';

export default function HomePage(data: {
  cards: {
    data: ResponseInfoType;
  };
}) {
  const newData = data.cards.data;
  return <Layout data={newData} />;
}

export const getServerSideProps = wrapper.getServerSideProps(
  (store) => async (context) => {
    const { page, search } = context.query;

    const data = await store.dispatch(
      getCharacters.initiate({
        page: checkRouterElement(page, '1'),
        searchParams: checkRouterElement(search, ''),
      })
    );
    await Promise.all(store.dispatch(reduxApi.util.getRunningQueriesThunk()));

    return {
      props: {
        cards: data,
      },
    };
  }
);
