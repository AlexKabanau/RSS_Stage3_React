import { useEffect } from 'react';
import { useParams } from 'react-router';

import reactLogo from '../../assets/react.svg';
import { useAppDispatch } from '../../store/store';
import { useSelector } from 'react-redux';
import { characterSelectors } from '../../store/slice/chracterSelectors';
import { fetchItem, setCharacter } from '../../store/slice/characterSlice';

export default function CartPage() {
  const dispatch = useAppDispatch();

  const { response, status } = useSelector(characterSelectors);
  const { id } = useParams();

  useEffect(() => {
    if (id) dispatch(fetchItem({ id: id }));
  }, [id, dispatch]);

  const onCloseClick = () => {
    dispatch(setCharacter(''));
  };
  return (
    <div className="cart">
      <div role="container">
        {status === 'loading' && (
          <div role="loading">
            <p>Loading...</p>
            <img src={reactLogo} className="logo" alt="loading" />
          </div>
        )}
        {response.data && (
          <>
            <button role="button" onClick={onCloseClick}>
              Close
            </button>
            <h3>{response.data.attributes.name}</h3>
            <div>
              {response.data.attributes.image && (
                <img
                  src={`${response.data.attributes.image}`}
                  alt="Character image"
                />
              )}
              <p>Species: {response.data.attributes.species}</p>
              {response.data.attributes.gender && (
                <p>Gender: {response.data.attributes.gender}</p>
              )}
              {response.data.attributes.nationality && (
                <p>Nationality: {response.data.attributes.nationality}</p>
              )}
              <p>Hair color: {response.data.attributes.hair_color}</p>
              <p>Eye color: {response.data.attributes.eye_color}</p>
              <p>Skin color: {response.data.attributes.skin_color}</p>
              <a href={`${response.data.attributes.wiki}`}>Wiki</a>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
