import React, { FC, useState } from 'react';
import style from './Paginator.module.css';
import cn from 'classnames';
// import { useSearchParams } from 'next/navigation';
import { checkRouterElement } from '@/utils/checkRouterElement';
// import { setPage } from '@/store/reducers/queryParams';
import { useSearchParams } from 'react-router';

type PropsType = {
  totalItemsCount: number | undefined;
  pageSize: number;
  currentPage: number;
  onPageChanged: (pageNumber: number) => void;
  portionsSize?: number;
};
const Paginator: FC<PropsType> = ({
  totalItemsCount,
  pageSize,
  currentPage,
  onPageChanged,
  portionsSize = 10,
}) => {
  // const dispatch = useAppDispatch();
  const [searchParams] = useSearchParams();
  let page = searchParams.get('page');
  // const search = searchParams?.get('search')

  // const { search } = router.query;
  // let { page } = router.query;
  page = checkRouterElement(page, '99');
  if (+page < 1) {
    // dispatch(setPage('1'));
    page = '1';
  }

  const pagesCount = Math.ceil((totalItemsCount || 0) / pageSize);
  const pages: Array<number> = [];

  for (let i = 1; i <= pagesCount; i++) {
    pages.push(i);
  }

  const portionCount = Math.ceil(pagesCount / portionsSize);
  const [portionNumber, setPortionNumber] = useState(1);
  const leftPortionPageNumber = (portionNumber - 1) * portionsSize + 1;
  const rightPortionPageNumber = portionNumber * portionsSize;

  return (
    <div data-testid={'paginator'} className={style.paginator}>
      {portionNumber > 1 && (
        <button
          onClick={() => {
            setPortionNumber(portionNumber - 1);
          }}
        >
          PREV
        </button>
      )}
      {pages
        .filter(
          (page) =>
            page >= leftPortionPageNumber && page <= rightPortionPageNumber
        )
        .map((page) => {
          return (
            <span
              key={page}
              className={cn(
                {
                  [style.selectedPage]: currentPage === page,
                },
                style.pageNumber
              )}
              onClick={() => {
                onPageChanged(page);
              }}
            >
              {page}
            </span>
          );
        })}
      {portionCount > portionNumber && (
        <button
          onClick={() => {
            setPortionNumber(portionNumber + 1);
          }}
        >
          NEXT
        </button>
      )}
    </div>
  );
};

export default Paginator;
