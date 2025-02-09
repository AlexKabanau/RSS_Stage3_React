import React from 'react';
import { ResponseType } from '../api/getItems';
import Item from './Item';

type ItemsType = {
  items: ResponseType[];
};
const ListItems: React.FC<ItemsType> = ({ items }) => {
  return (
    <ul className="list-items">
      {items.map((item, key) => (
        <Item key={key} item={item} />
      ))}
    </ul>
  );
};

export default ListItems;
