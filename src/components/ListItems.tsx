import React from 'react';
import { ResponseType } from '../api/getItems';
import Item from './Item';
import { useSelector } from 'react-redux';
import { favoritsSelectors } from '../store/slice/favoritsSelectors';
import { clearFavorits, setFavorites } from '../store/slice/favoritsSlice';
import { useAppDispatch } from '../store/store';
import { ArrowDownToLine, Trash } from 'lucide-react';
import { useDownloadCSV } from '../hooks/downloadItemsCSV';
import { useToast } from './ToastContext';
import { useGetCharactersQuery } from '../api/redux.api';

type ItemsType = {
  items: ResponseType[];
};

const ListItems: React.FC<ItemsType> = ({ items }) => {
  // const {
  //     data: response,
  //     // error,
  //     // isFetching,
  //     // refetch,
  //   } = useGetCharactersQuery(
  //     { searchParams: search, page: Number(page) },
  //     { refetchOnMountOrArgChange: true } // Отключаем кеширование
  //   );
  const dispatch = useAppDispatch();
  const { addToast } = useToast();
  const favorits = useSelector(favoritsSelectors);
  const downloadCSV = useDownloadCSV();

  const isFavorite = (id: string) => favorits.some((fav) => fav.id === id);

  const showAddedToast = () => {
    addToast(
      <p>
        One character successfully added to favorites!
        <br /> Favorits: {favorits.length + 1}
        <button
          className={'favoritButton'}
          aria-label="Trash"
          onClick={() => {
            dispatch(clearFavorits());
            addToast('Successfully deleted all characters!');
          }}
        >
          Unselect all
        </button>
        <button
          className={'favoritButton'}
          onClick={downloadCSV}
          aria-label="Download"
        >
          Download
        </button>
      </p>
    );
  };

  const showRemovedToast = () => {
    addToast(
      <p data-testid="toast">
        One character successfully removed from favorites!
      </p>
    );
  };

  const toggleFavorite = (item: ResponseType) => {
    if (!Array.isArray(favorits)) {
      console.error('favorits is not an array!');
      return;
    }

    const updatedFavorites = isFavorite(item.id)
      ? favorits.filter((fav) => fav.id !== item.id)
      : [...favorits, item];

    dispatch(setFavorites(updatedFavorites));

    if (!isFavorite(item.id)) {
      showAddedToast();
    } else {
      showRemovedToast();
    }
  };

  return (
    <ul className="list-items">
      {items.map((item) => (
        <Item
          key={item.id}
          item={item}
          isFavorite={isFavorite(item.id)}
          onToggleFavorite={() => toggleFavorite(item)}
        />
      ))}
    </ul>
  );
};

export default ListItems;
