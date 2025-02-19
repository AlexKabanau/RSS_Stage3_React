import React from 'react';
import { ResponseType } from '../api/getItems';
import { Link, useLocation } from 'react-router-dom';

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
  const location = useLocation();
  return (
    <li className="item">
      <Link
        role="link"
        to={`character/${item.id}${location.search}`}
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
        Favorits
      </label>
      <p>Name: {item.attributes.name}</p>
      <p>Species: {item.attributes.species}</p>
      <p>Gender: {item.attributes.gender}</p>
    </li>
  );
};

export default Item;
