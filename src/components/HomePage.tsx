import React from 'react';
import {
  Outlet,
  useLoaderData,
  useNavigate,
  useOutlet,
  useSearchParams,
} from 'react-router';
import Header from './Header';
import Footer from './Footer';
import Main from './Main';
import { ResponseInfoType } from '@/api/getItems';

export default function HomePage() {
  const itemsData: ResponseInfoType = useLoaderData();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const onPageChanged = (page: number) => {
    // Логика для изменения страницы
    navigate(`?page=${page}&search=${searchParams.get('search') || ''}`);
  };
  const hasOutlet = useOutlet();
  // const onPageChanged = (page: number) => {
  //   console.log(page);
  //   // dispatch(setPage(page.toString()));
  //   // router.push(`?page=${page}&search=${searchParams?.get('search') ?? ''}`);
  // };
  return (
    <div className="app">
      <Header />
      <div role="homePage" className="main-container">
        <Main
          // className={className}
          // className={''}
          className={!hasOutlet ? 'fullWidth' : 'width2_3'}
          items={itemsData.data}
          count={itemsData.meta.pagination?.records}
          onPageChanged={onPageChanged} // ✅ добавили onPageChanged
        />
        <Outlet />
      </div>
      <Footer />
    </div>
  );
}
