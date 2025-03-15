import React from 'react';
import { SubmitFormDataType } from '../store/reducers/dataSlice';
import './Item';
import { useAppSelector } from '../store/store';

function Item({
  key,
  item,
  i,
  highlight,
}: {
  key: number;
  item: SubmitFormDataType;
  i: number;
  highlight: number;
}) {
  const border = useAppSelector((state) => state.borderStyle);

  // console.log(item);
  return (
    <div key={key} className="data-item" style={highlight === i ? border : {}}>
      <p className="itemProp">
        <b>Name:</b> {item.name}
      </p>
      <p className="itemProp">
        <b>Age:</b> {item.age}
      </p>
      <p className="itemProp">
        <b>Gender:</b> {item.gender}
      </p>
      <p className="itemProp">
        <b>Country:</b> {item.country}
      </p>
      <p className="itemProp">
        <b>Email:</b> {item.email}
      </p>
      <p className="itemProp">
        <b>Password:</b> {item.password}
      </p>
      <p className="itemProp">
        <b>Password cofirm:</b> {item.confirmPassword}
      </p>
      <p className="itemProp">
        <b>Accept:</b> {JSON.stringify(item.accept)}
      </p>
      <p className="itemProp">
        <img className="propImage" src={item.picture} alt="Picture" />
      </p>
    </div>
  );
}

export default Item;
