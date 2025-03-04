// import { getCharacters } from '@/api/getItems';
import React from 'react';
import {
  getCharacters,
  reduxApi,
  useGetCharactersQuery,
} from '@/store/api/characterApi';
import { wrapper } from '@/store/store';
import { checkRouterElement } from '@/utils/checkRouterElement';
import { useRouter } from 'next/router';
import HomePage from '@/components/HomePage';
import reactLogo from '../../public/react.svg';
import { ResponseInfoType } from '@/api/getItems';

export default function HomePageContainer({
  initialCards,
}: {
  initialCards: ResponseInfoType;
}) {
  const router = useRouter();
  const { page, search } = router.query;
  const {
    data: cards,
    isLoading,
    error,
  } = useGetCharactersQuery(
    {
      page: checkRouterElement(page, '1'),
      searchParams: checkRouterElement(search, ''),
    },
    { skip: false }
  );
  if (isLoading || !cards) {
    return (
      <div>
        <p>Loading...</p>
        <img src={reactLogo.src} className="logo" alt="loading" />
      </div>
    );
  }
  if (error) {
    console.error('Error loading data:', error);
    return <p>Ошибка загрузки данных.</p>;
  }
  const finalCards = cards ?? initialCards;
  console.log('Final cards:', finalCards);

  return <HomePage cards={finalCards} />;
}

export const getServerSideProps = wrapper.getServerSideProps(
  (store) => async (context) => {
    const { page, search } = context.query;

    try {
      const data = await store
        .dispatch(
          getCharacters.initiate({
            page: checkRouterElement(page, '1'),
            searchParams: checkRouterElement(search, ''),
          })
        )
        .unwrap();

      await Promise.all(store.dispatch(reduxApi.util.getRunningQueriesThunk()));

      return {
        props: {
          initialCards: data,
        },
      };
    } catch (error) {
      console.error('Ошибка при загрузке:', error);
      return {
        props: {
          initialCards: null,
        },
      };
    }
  }
);
