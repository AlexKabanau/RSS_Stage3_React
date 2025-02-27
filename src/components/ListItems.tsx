import React from 'react';
import { ResponseType } from '../api/getItems';
import Item from './Item';
import { useSelector } from 'react-redux';
import { favoritsSelectors } from '../store/slice/favoritsSelectors';
import { clearFavorits, setFavorites } from '../store/slice/favoritsSlice';
import { useAppDispatch } from '../store/store';
import { useDownloadCSV } from '../hooks/downloadItemsCSV';
import { useToast } from './useToast';

type ItemsType = {
  items: ResponseType[];
};

const ListItems: React.FC<ItemsType> = ({ items }) => {
  const dispatch = useAppDispatch();
  const { addToast } = useToast();
  const favorites = useSelector(favoritsSelectors);
  const downloadCSV = useDownloadCSV();

  const isFavorite = (id: string) => favorites.some((fav) => fav.id === id);

  const showAddedToast = () => {
    addToast(
      <p>
        One character successfully added to favorites!
        <br /> Favorites: {favorites.length + 1}
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
    if (!Array.isArray(favorites)) {
      console.error('favorits is not an array!');
      return;
    }

    const updatedFavorites = isFavorite(item.id)
      ? favorites.filter((fav) => fav.id !== item.id)
      : [...favorites, item];

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
