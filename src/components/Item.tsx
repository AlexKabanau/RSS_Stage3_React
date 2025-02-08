import React from 'react';
import { ResponseType } from '../api/getItems';
import { Link } from 'react-router';

type ItemPropsType = {
  item: ResponseType;
};
const Item: React.FC<ItemPropsType> = ({ item }) => {
  console.log(item);
  return (
    <li className="item">
      <Link to={`character/${item.id}`}>
        <h3>{item.attributes.name}</h3>
        <p>Name: {item.attributes.name}</p>
        <p>Species: {item.attributes.species}</p>
        <p>Gender: {item.attributes.gender}</p>
      </Link>
    </li>
  );
};

export default Item;
