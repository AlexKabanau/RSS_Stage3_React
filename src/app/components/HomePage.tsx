'use client';

import React from 'react';
import { ResponseInfoType } from '@/api/getItems';
import Layout from '@/components/Layout';
import Main from '../../components/Main';
import { useAppDispatch } from '@/store/store';
import { useRouter, useSearchParams } from 'next/navigation';
import { setPage } from '@/store/reducers/queryParams';

export default function HomePage({ cards }: { cards: ResponseInfoType }) {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const searchParams = useSearchParams();
  if (!cards || !cards.data) {
    return <p>Ошибка загрузки данных HomePage</p>;
  }

  const onPageChanged = (page: number) => {
    dispatch(setPage(page.toString()));
    router.push(`?page=${page}&search=${searchParams.get('search') ?? ''}`);
  };
  const newData = cards;
  return (
    <div role="homePage" className="main-container">
      <Main
        className={'fullWidth'}
        // className={!children ? 'fullWidth' : 'width2_3'}
        items={newData.data}
        count={newData.meta.pagination.records}
        onPageChanged={onPageChanged} // ✅ добавили onPageChanged
      />
      {/* {children} */}
    </div>
  );
}
