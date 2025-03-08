import React from 'react';
import { ResponseType } from '../api/getItems';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';

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
  const searchParams = useSearchParams();
  const page = searchParams?.get('page');
  const search = searchParams?.get('search');
  const href = search
    ? `/character/${item.id}?page=${page || 1}&search=${search || ''}`
    : `/character/${item.id}?page=${page || 1}`;

  return (
    <li className="item" role="item">
      <Link role="link" href={href} data-testid={`link-${item.id}`}>
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
