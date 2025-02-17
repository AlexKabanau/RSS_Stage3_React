import React from 'react';
import { ResponseType } from '../api/getItems';
import Item from './Item';
import { useSelector } from 'react-redux';
import { favoritsSelectors } from '../store/slice/favoritsSelectors';
import { clearFavorits, setFavorites } from '../store/slice/favoritsSlice';
import { useAppDispatch } from '../store/store';
import { toast } from 'sonner';
import { ArrowDownToLine, Trash, Trash2 } from 'lucide-react';
import { DownloadItemsCSV, useDownloadCSV } from '../hooks/downloadItemsCSV';

type ItemsType = {
  items: ResponseType[];
};

const ListItems: React.FC<ItemsType> = ({ items }) => {
  const dispatch = useAppDispatch();
  const downloadCSV = useDownloadCSV();

  const favorits = useSelector(favoritsSelectors);
  // let x = favorits.includes

  const toggleFavorite = (id: string) => {
    console.log(favorits); // Вывод текущего состояния favorits

    if (!Array.isArray(favorits)) {
      console.error('favorits is not an array!'); // Если это не массив, выведем ошибку
      return; // Прекращаем выполнение, чтобы избежать ошибки
    }

    // Создаем новый массив в зависимости от текущего состояния
    const updatedFavorites = favorits.includes(id)
      ? favorits.filter((favId) => favId !== id) // Удаляем из избранного
      : [...favorits, id]; // Добавляем в избранное

    dispatch(setFavorites(updatedFavorites)); // Теперь передаем массив
    // console.log(favorits, 'favorits after');
    // debugger;
    if (!favorits.includes(id)) {
      toast(
        `One character successfully added to favorites! \
        Favorits: ${favorits.length + 1}`,
        //   {
        //   cancel: {
        //     label: 'Close',
        //     onClick: () => toast.dismiss(),
        //   },

        // },
        {
          action: (
            <>
              <Trash
                size={15}
                cursor={'pointer'}
                onClick={() => {
                  dispatch(clearFavorits());
                  toast.success('Successfully deleted all characters!');
                }}
              />
              <ArrowDownToLine
                size={15}
                cursor={'pointer'}
                onClick={downloadCSV}
              />
            </>
          ),
        }
      );
    } else {
      toast(
        'One character successfully removed from favorites!',
        {
          cancel: {
            label: 'Close',
            onClick: () => toast.dismiss(),
          },
        }
        // {
        //   cancel: <button onClick={() => toast.dismiss()}>Close</button>,
        // },
      );
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
