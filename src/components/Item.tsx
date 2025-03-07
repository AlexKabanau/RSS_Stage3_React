import React from 'react';
import { ResponseType } from '../api/getItems';
// import Link from 'next/link';
// import { useSearchParams } from 'next/navigation';
import { Link, useSearchParams } from 'react-router-dom';

type ItemPropsType = {
  item: ResponseType;
  isFavorite: boolean;
  onToggleFavorite: (id: string) => void;
};
const Item: React.FC<ItemPropsType> = ({
  item,
  isFavorite,
  onToggleFavorite,
}) => {
  const [searchParams] = useSearchParams();
  const page = searchParams.get('page');
  const search = searchParams.get('search');
  // // // const { page, search } = router.query;
  // const href = '123';
  const href = search
    ? `/character/${item.id}?page=${page || 1}&search=${search || ''}`
    : `/character/${item.id}?page=${page || 1}`;

  // http://localhost:3000/character/dde712de-4fce-487f-a365-e15bf01d31ce?page=5&search=
  // {
  //     pathname: '/character/[id]',
  //     query: {
  //       id: item.id,
  //       page: page || '1',
  //       search: search || '',
  //     },
  //   }
  // : {
  //     pathname: '/character/[id]',
  //     query: {
  //       id: item.id,
  //       page: page || '1',
  //     },
  //   };
  return (
    <li className="item" role="item">
      <Link
        role="link"
        // href={`/character/${item.id}`}
        to={href}
        data-testid={`link-${item.id}`}
      >
        <h3>{item.attributes.name}</h3>
      </Link>
      <label>
        <input
          type="checkbox"
          data-testid={`favorite-checkbox-${item.id}`}
          checked={isFavorite}
          onChange={() => onToggleFavorite(item.id)}
        />
        Favorites
      </label>
      <p>Name: {item.attributes.name}</p>
      <p>Species: {item.attributes.species}</p>
      <p>Gender: {item.attributes.gender}</p>
    </li>
  );
};

export default Item;
