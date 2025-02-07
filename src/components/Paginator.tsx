import { FC, useState } from 'react';
import style from './Paginator.module.css';
import cn from 'classnames';

type PropsType = {
  totalItemsCount: number;
  pageSize: number;
  currentPage: number;
  setCurrentPage: (page: number) => void;
  onPageChanged: (pageNumber: number) => void;
  portionsSize?: number;
};
const Paginator: FC<PropsType> = ({
  totalItemsCount,
  pageSize,
  currentPage,
  onPageChanged,
  portionsSize = 10,
  setCurrentPage,
}) => {
  const pagesCount = Math.ceil(totalItemsCount / pageSize);
  console.log(totalItemsCount);
  const pages: Array<number> = [];

  for (let i = 1; i <= pagesCount; i++) {
    pages.push(i);
  }

  console.log(pages);

  const portionCount = Math.ceil(pagesCount / portionsSize);
  const [portionNumber, setPortionNumber] = useState(1);
  const leftPortionPageNumber = (portionNumber - 1) * portionsSize + 1;
  const rightPortionPageNumber = portionNumber * portionsSize;

  return (
    <div className={style.paginator}>
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
              // currentPage === page ? style.selectedPage : style.pageNumber}
              onClick={() => {
                setCurrentPage(page);
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
