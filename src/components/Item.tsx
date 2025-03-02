import React from 'react';
import { ResponseType } from '../api/getItems';
import { useLocation } from 'react-router-dom';
import Link from 'next/link';
import { useRouter } from 'next/router';

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
  const router = useRouter();
  const { page, search } = router.query;
  const href = search
    ? {
        pathname: '/character/[id]',
        query: {
          id: item.id,
          page: page || '1',
          // limit: limit || '10',
          search: search || '',
        },
      }
    : {
        pathname: '/character/[id]',
        query: {
          id: item.id,
          page: page || '1',
          // limit: limit || '10',
        },
      }; // const location = useLocation();
  return (
    <li className="item">
      <Link
        role="link"
        href={href}
        // href={`character/${item.id}${location.search}`}
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
