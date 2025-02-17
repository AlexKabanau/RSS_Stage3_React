import React from 'react';
import { ResponseType } from '../api/getItems';
import Item from './Item';
import { useSelector } from 'react-redux';
import { favoritsSelectors } from '../store/slice/favoritsSelectors';
import { setFavorites } from '../store/slice/favoritsSlice';
import { useAppDispatch } from '../store/store';

type ItemsType = {
  items: ResponseType[];
};

const ListItems: React.FC<ItemsType> = ({ items }) => {
  const dispatch = useAppDispatch();

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
    console.log(favorits, 'favorits after');
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
