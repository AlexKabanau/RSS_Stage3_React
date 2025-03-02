import React from 'react';
import { ResponseType } from '../api/getItems';
import { useLocation } from 'react-router-dom';
import Link from 'next/link';

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
  // const location = useLocation();
  return (
    <li className="item">
      <Link
        role="link"
        href={{ pathname: `/character/${item.id}`, query: { id: item.id } }}
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
