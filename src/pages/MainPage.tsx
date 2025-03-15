import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../store/store';
import './MainPage.css';
import Item from '../components/Item';
import { setShadow } from '../store/reducers/dataSlice';

function MainPage() {
  const data = useAppSelector((state) => state.data);
  const dispatch = useAppDispatch();
  useEffect(() => {
    if (data.length) {
      const timeoutId = setTimeout(() => {
        dispatch(setShadow(''));
      }, 3000);
      return () => clearTimeout(timeoutId);
    }
  }, [data, dispatch]);
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
          data.map((item, i) => (
            <Item item={item} key={i} i={i} highlight={0} />
          ))
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
