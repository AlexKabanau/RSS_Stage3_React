import React from 'react';
import {
  getCharacter,
  getCharacters,
  reduxApi,
} from '../../store/api/characterApi';
import Layout from '../layout';
import { wrapper } from '@/store/store';
import { checkRouterElement } from '@/utils/checkRouterElement';
import { GetCharacterType, ResponseInfoType } from '@/api/getItems';
import CharacterDetails from '@/components/CharacterDetails';

export default function CartPage({
  charactersData,
  characterData,
}: {
  charactersData: ResponseInfoType;
  characterData: GetCharacterType;
}) {
  return (
    <Layout data={charactersData}>
      <CharacterDetails characterData={characterData} />
    </Layout>
  );
}

export const getServerSideProps = wrapper.getServerSideProps(
  (store) => async (context) => {
    const { page, search, id } = context.query;

    const characters = await store.dispatch(
      getCharacters.initiate({
        page: checkRouterElement(page, '1'),
        searchParams: checkRouterElement(search, ''),
      })
    );
    const character = await store.dispatch(
      getCharacter.initiate({ id: checkRouterElement(id, '') })
    );
    console.log('page', page, 'search', search);
    await Promise.all(store.dispatch(reduxApi.util.getRunningQueriesThunk()));

    return {
      props: {
        charactersData: characters?.data,
        characterData: character?.data,
      },
    };
  }
);
