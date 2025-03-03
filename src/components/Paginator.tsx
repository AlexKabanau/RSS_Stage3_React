import React, { FC, useState } from 'react';
import style from './Paginator.module.css';
import cn from 'classnames';
import { useAppDispatch } from '@/store/store';
import { useRouter } from 'next/router';
import { checkRouterElement } from '@/utils/checkRouterElement';
import { setPage } from '@/store/reducers/queryParams';

type PropsType = {
  totalItemsCount: number;
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
  const dispatch = useAppDispatch();
  const router = useRouter();
  // const { search } = router.query;
  let { page } = router.query;
  page = checkRouterElement(page, '10');
  if (+page < 1) {
    dispatch(setPage('1'));
    page = '1';
  }

  const pagesCount = Math.ceil(totalItemsCount / pageSize);
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
