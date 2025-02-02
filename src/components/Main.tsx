import { Component } from 'react';
import { ResponseType } from '../api/getItems';

type MainPropsType = {
  items: ResponseType[];
};

export default class Main extends Component<MainPropsType> {
  render() {
    return (
      <main>
        <ul className="list-items">
          {this.props.items.map((item, key) => (
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
  }
}
