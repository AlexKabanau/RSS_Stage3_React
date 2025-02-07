import React, { useState } from 'react';
import { ResponseType } from '../api/getItems';
import ListItems from './ListItems';
import Paginator from './Paginator';
// import { useLocation, useNavigate } from 'react-router';
import { DEFAULT_PAGE, DEFAULT_PAGE_SIZE } from '../constants/constants';
// import { useSearchParams } from 'react-router';

type MainPropsType = {
  items: ResponseType[];
  count: number;
  onPageChanged: (page: number) => void;
  // nextPageLink: string;
  // prevPageLink: string;
};

const Main: React.FC<MainPropsType> = ({
  items,
  count,
  onPageChanged,
  // nextPageLink,
  // prevPageLink,
}) => {
  const [currentPage, setCurrentPage] = useState<number>(DEFAULT_PAGE);
  // const currentPage = DEFAULT_PAGE;

  // const [searchParams, setSearchParams] = useSearchParams();
  // console.log('searchParams', searchParams);
  // console.log('count', count);
  // console.log(nextPageLink);

  // const onPageChanged = (page: number) => {
  //   getTotalInfo(, page)
  // }
  // const location = useLocation();
  // console.log(location.pathname);
  // const navigate = useNavigate();
  // console.log(navigate.);
  return (
    <main>
      <Paginator
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        totalItemsCount={count}
        pageSize={DEFAULT_PAGE_SIZE}
        onPageChanged={onPageChanged}
      />
      <ListItems items={items} />
    </main>
  );
};

export default Main;
