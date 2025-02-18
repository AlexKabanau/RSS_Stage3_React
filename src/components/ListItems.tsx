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

type ItemsType = {
  items: ResponseType[];
};

const ListItems: React.FC<ItemsType> = ({ items }) => {
  const dispatch = useAppDispatch();
  const downloadCSV = useDownloadCSV();
  const { addToast } = useToast();
  const favorits = useSelector(favoritsSelectors);

  const showAddedToast = () => {
    addToast(
      <p>
        One character successfully added to favorites!
        <br /> Favorits: {favorits.length + 1}
        <Trash
          size={15}
          cursor={'pointer'}
          onClick={() => {
            dispatch(clearFavorits());
            addToast('Successfully deleted all characters!');
          }}
        />
        <ArrowDownToLine size={15} cursor={'pointer'} onClick={downloadCSV} />
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

  const toggleFavorite = (id: string) => {
    if (!Array.isArray(favorits)) {
      console.error('favorits is not an array!');
      return;
    }

    const updatedFavorites = favorits.includes(id)
      ? favorits.filter((favId) => favId !== id)
      : [...favorits, id];

    dispatch(setFavorites(updatedFavorites));

    if (!favorits.includes(id)) {
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
          isFavorite={favorits.includes(item.id.toString())}
          onToggleFavorite={toggleFavorite}
        />
      ))}
    </ul>
  );
};

export default ListItems;
