import React from 'react';
import { ResponseType } from '../api/getItems';
import Item from './Item';

type ItemsType = {
  items: ResponseType[];
};
const ListItems: React.FC<ItemsType> = ({ items }) => {
  // console.log(items);
  return (
    <ul className="list-items">
      {items.map((item, key) => (
        <Item key={key} item={item} />
        // <li key={key} className="item">
        //   <h3>{item.name}</h3>
        //   <p>name: {item.name}</p>
        //   <p>model: {item.model}</p>
        //   <p>manufacturer: {item.manufacturer}</p>
        // </li>
      ))}
    </ul>
  );
};

export default ListItems;
