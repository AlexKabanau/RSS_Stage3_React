import React from 'react';
import { ResponseInfoType } from '@/api/getItems';
// import Main from '@/components/Main';
// import { useAppDispatch } from '@/store/store';
// import { setPage } from '@/store/reducers/queryParams';
// import { useSearchParams, useRouter } from 'next/navigation';

export default function CharacterLayout({
  children,
  // data,
}: {
  children: React.ReactNode;
  data: ResponseInfoType;
}) {
  // const dispatch = useAppDispatch();
  // const router = useRouter();
  // const searchParams = useSearchParams();

  // const onPageChanged = (page: number) => {
  //   dispatch(setPage(page.toString()));
  //   router.push(`?page=${page}&search=${searchParams.get('search') ?? ''}`);
  // };

  return (
    // <div role="homePage" className="main-container">
    // <div
    //   className="cart"
    //   data-testid="cart-page"
    //   // ref={detailsRef} // Привязываем ref к контейнеру
    // >
    <>
      {/* <h1>Страница персонажей</h1> */}
      {children}
    </>
    // </div>
    // <Main
    //   className={!children ? 'fullWidth' : 'width2_3'}
    //   items={data.data}
    //   count={data.meta.pagination.records}
    //   onPageChanged={onPageChanged} // ✅ добавили onPageChanged
    // />
    // </div>
  );
}
