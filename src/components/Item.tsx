import React from 'react';
import { ResponseType } from '../api/getItems';

type ItemPropsType = {
  item: ResponseType;
};
const Item: React.FC<ItemPropsType> = ({ item }) => {
  return (
    <li className="item">
      <h3>{item.name}</h3>
      <p>name: {item.name}</p>
      <p>model: {item.model}</p>
      <p>manufacturer: {item.manufacturer}</p>
    </li>
  );
};

export default Item;
