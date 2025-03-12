import React from 'react';
import { Link } from 'react-router-dom';
import { useAppSelector } from '../store/store';

function MainPage() {
  const data = useAppSelector((state) => state.data);
  return (
    <>
      <p>Types of form:</p>
      <nav>
        <Link to={'/hookForm'} className="navLink">
          HookForm
        </Link>
        <Link to={'/uncontrollerForm'} className="navLink">
          Uncontrolled Form
        </Link>
      </nav>
      {data.length ? (
        data.map((item, key) => <div key={key}>{JSON.stringify(item)}</div>)
      ) : (
        <div>
          <p>Items not fond</p>
          <p>Please choose type of form</p>
        </div>
      )}
    </>
  );
}

export default MainPage;
