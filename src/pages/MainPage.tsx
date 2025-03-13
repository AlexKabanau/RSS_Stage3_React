import React from 'react';
import { Link } from 'react-router-dom';
import { useAppSelector } from '../store/store';
import './MainPage.css';
import Item from '../components/Item';

function MainPage() {
  const data = useAppSelector((state) => state.data);
  return (
    <div className="main-page">
      <p className="main-page-title">Types of form:</p>
      <nav className="main-page-nav">
        <Link to={'/hookForm'} className="navLink">
          HookForm
        </Link>
        <Link to={'/uncontrollerForm'} className="navLink">
          Uncontrolled Form
        </Link>
      </nav>
      <div className="data-container">
        {data.length ? (
          data.map((item, key) => <Item item={item} key={key} />)
        ) : (
          <div className="empty-state">
            <p>Items not fond</p>
            <p>Please choose type of form</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default MainPage;
