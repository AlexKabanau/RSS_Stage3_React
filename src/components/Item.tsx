import React from 'react';
import { ResponseType } from '../api/getItems';
import { Link, useLocation } from 'react-router-dom';

type ItemPropsType = {
  item: ResponseType;
};
const Item: React.FC<ItemPropsType> = ({ item }) => {
  const location = useLocation();
  // console.log(item);
  return (
    <li className="item">
      <Link role="link" to={`character/${item.id}${location.search}`}>
        <h3>{item.attributes.name}</h3>
        <p>Name: {item.attributes.name}</p>
        <p>Species: {item.attributes.species}</p>
        <p>Gender: {item.attributes.gender}</p>
      </Link>
    </li>
  );
};

export default Item;
