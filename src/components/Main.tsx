import React from 'react';
import { ResponseType } from '../api/getItems';

type MainPropsType = {
  items: ResponseType[];
};

const Main: React.FC<MainPropsType> = ({ items }) => {
  return (
    <main>
      <ul className="list-items">
        {items.map((item, key) => (
          <li key={key} className="item">
            <h3>{item.name}</h3>
            <p>name: {item.name}</p>
            <p>model: {item.model}</p>
            <p>manufacturer: {item.manufacturer}</p>
          </li>
        ))}
      </ul>
    </main>
  );
};

export default Main;
