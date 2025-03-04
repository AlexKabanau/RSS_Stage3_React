import React from 'react';
// import { getCharacter, getCharacters } from '@/store/api/characterApi';
import { checkRouterElement } from '@/utils/checkRouterElement';
import { GetCharacterType, ResponseInfoType } from '@/api/getItems';
import CharacterDetails from '@/app/components/CharacterDetails';

type Props = {
  params: { id: string };
  searchParams: { page?: string; search?: string };
};

async function getData(id: string, page: string, search: string) {
  try {
    const [charactersRes, characterRes] = await Promise.all([
      fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/characters?page=${checkRouterElement(page, '1')}&search=${checkRouterElement(search, '')}`
      ),
      fetch(`${process.env.NEXT_PUBLIC_API_URL}/characters/${id}`),
    ]);

    if (!charactersRes.ok || !characterRes.ok)
      throw new Error('Ошибка загрузки');

    const charactersData: ResponseInfoType = await charactersRes.json();
    const characterData: GetCharacterType = await characterRes.json();

    return { charactersData, characterData };
  } catch (error) {
    console.error('Ошибка при загрузке:', error);
    return { charactersData: null, characterData: null };
  }
}

export default async function CharacterPage({ params, searchParams }: Props) {
  const { id } = params;
  const { page = '1', search = '' } = searchParams;
  const { charactersData, characterData } = await getData(id, page, search);

  if (!charactersData || !characterData) {
    return <p>Ошибка загрузки данных.</p>;
  }

  return <CharacterDetails characterData={characterData} />;
}
