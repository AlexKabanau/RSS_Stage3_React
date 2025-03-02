import React from 'react';
import { ResponseType } from '../api/getItems';
import ListItems from './ListItems';
import Paginator from './Paginator';
import { RESOURCES_PER_PAGE } from '../constants/constants';
import { queryParamsSelectors } from '../store/slice/queryParamsSelectors';
import { useSelector } from 'react-redux';
import { useAppDispatch, useAppSelector } from '@/store/store';
import reactLogo from '../../public/react.svg';
import { ArrowDownToLine, Trash2 } from 'lucide-react';
import { clearFavorits } from '@/store/reducers/favorites';
import { setPage } from '@/store/reducers/queryParams';
import { setSearchParamsToState } from '@/store/slice/serchParamsSlice';
import { useSearchParams } from 'react-router';
import { useRouter } from 'next/router';
import { useDownloadCSV } from '@/hooks/downloadItemsCSV';
import { useToast } from './useToast';

type MainPropsType = {
  items: ResponseType[];
  count: number;
  onPageChanged: (page: number) => void;
  className?: string;
};

const Main: React.FC<MainPropsType> = ({
  items,
  count,
  onPageChanged,
  className,
}) => {
  const { addToast } = useToast();

  const favorites = useAppSelector((state) => state.favorites.favorites);

  const dispatch = useAppDispatch();
  // const { page } = useSelector(queryParamsSelectors);
  const router = useRouter();

  const { page } = router.query;
  const isLoading = useAppSelector(
    (state) => state.isLoading.isMainPageCharactersLoading
  );
  const downloadCSV = useDownloadCSV();

  const onDeleteIconClick = () => {
    dispatch(clearFavorits());
    addToast('Successfully deleted all characters!');
  };
  const onDownloadIconClick = () => {
    // console.log('Download');
    // dispatch(clearFavorits());
    downloadCSV();
  };

  return (
    <main className={className}>
      {isLoading && (
        <div>
          <p>Loading...</p>
          <img src={reactLogo.src} className="logo" alt="loading" />
        </div>
      )}
      {!isLoading && (!items || items.length < 1) && (
        <h2>Characters not found</h2>
      )}
      {!isLoading && items && (
        <>
          {favorites.length > 0 && (
            <>
              <p className="favorits">
                Favorites: {favorites.length}
                <button
                  className="favoritButton"
                  aria-label="Trash"
                  onClick={onDeleteIconClick}
                >
                  <Trash2 size={12} />
                </button>
                <button
                  className={'favoritButton'}
                  onClick={onDownloadIconClick}
                  aria-label="Download"
                >
                  <ArrowDownToLine size={12} />
                </button>
              </p>
            </>
          )}
          <Paginator
            currentPage={Number(page)}
            totalItemsCount={count}
            pageSize={RESOURCES_PER_PAGE}
            onPageChanged={onPageChanged}
          />
          <ListItems items={items} />
        </>
      )}
    </main>
  );
};

export default Main;
