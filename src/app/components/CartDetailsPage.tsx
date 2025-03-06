// 'use client';

import React from 'react';
import { GetCharacterType, ResponseInfoType } from '@/api/getItems';
// import Layout from '@/components/Layout';
// import Main from '../../components/Main';
// import { useAppDispatch } from '@/store/store';
// import { useRouter, useSearchParams } from 'next/navigation';
// import { setPage } from '@/store/reducers/queryParams';
import CharacterDetails from './CharacterDetails';
import HomePageComponent from './HomePageComponent';
// import HomePageComponent from './HomePageComponent';

export default function CartDetailsPage({
  cards,
  character,
}: {
  cards: ResponseInfoType;
  character: GetCharacterType;
}) {
  // const dispatch = useAppDispatch();
  // const router = useRouter();
  // const searchParams = useSearchParams();
  if (!cards || !cards.data) {
    return <p>Ошибка загрузки данных HomePage</p>;
  }

  // const onPageChanged = (page: number) => {
  // dispatch(setPage(page.toString()));
  // router.push(`?page=${page}&search=${searchParams.get('search') ?? ''}`);
  // };
  // const newData = cards;
  // console.log('newData', newData);
  return (
    <div role="homePage" className="main-container">
      <HomePageComponent cards={cards} className={'width2_3'} />
      <CharacterDetails characterData={character} />
    </div>
    // <div role="homePage" className="main-container">
    // {/* <Main
    // className={'fullWidth'} T16
    // className={'width2_3'}
    // items={newData.data}
    // count={newData.meta.pagination?.records}
    // onPageChanged={() => {}} // ✅ добавили onPageChanged
    // /> */}
    // {/* <section> */}
    // {/* <h1>Страница персонажей</h1> */}
    // {/* {children} */}
    // {/* <div className="cart" data-testid="cart-page"> */}
    // {/* <p>Character data</p> */}
    // {/* </div> */}
    // {/* </section> */}
    /*
    зп частично на руки, частично с налогами
    в начале с налогами
    ментеринг
    удаленки нет
    
    очень меня подбивал что я не справлюсь

    тех дата дата инжениринг
    только запад
    фронт вырости сложно
    с бэком проще
    с хорошим англ тоже

    дальше техническое
    англ скрининг
    
    */
    // </div>
  );
}
