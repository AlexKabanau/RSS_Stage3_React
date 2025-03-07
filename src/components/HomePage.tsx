import React from 'react';
import { useLoaderData, useNavigate, useSearchParams } from 'react-router';
import Header from './Header';
import Footer from './Footer';
import Main from './Main';
import { ResponseType } from '@/api/getItems';

export default function HomePage() {
  const itemsData: ResponseInfoType = useLoaderData();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const onPageChanged = (page: number) => {
    // Логика для изменения страницы
    navigate(`?page=${page}&search=${searchParams.get('search') || ''}`);
  };
  // const onPageChanged = (page: number) => {
  //   console.log(page);
  //   // dispatch(setPage(page.toString()));
  //   // router.push(`?page=${page}&search=${searchParams?.get('search') ?? ''}`);
  // };
  return (
    <div className="app">
      <Header />
      {/* {JSON.stringify(itemsData)} */}
      <Main
        // className={className}
        className={''}
        // className={!children ? 'fullWidth' : 'width2_3'}
        items={itemsData.data}
        count={itemsData.meta.pagination?.records}
        onPageChanged={onPageChanged} // ✅ добавили onPageChanged
      />
      <Footer />
    </div>
  );
}
