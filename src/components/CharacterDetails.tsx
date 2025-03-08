import { GetCharacterType } from '@/api/getItems';
import React, { useCallback, useEffect, useRef } from 'react';
import {
  Link,
  useLoaderData,
  useNavigate,
  useSearchParams,
} from 'react-router-dom';

const CharacterDetails: React.FC = () => {
  const characterData: GetCharacterType = useLoaderData();
  const detailsRef = useRef<HTMLDivElement>(null);
  const [searchParams] = useSearchParams();
  const page = searchParams.get('page');
  const search = searchParams.get('search');
  const href = search
    ? `/?page=${page || 1}&search=${search || ''}`
    : `/?page=${page || 1}`;
  const navigate = useNavigate();
  const data = characterData.data;

  const handleClose = useCallback(() => {
    navigate(href);
  }, [navigate, href]);
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        detailsRef.current &&
        !detailsRef.current.contains(event.target as Node)
      ) {
        handleClose();
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [handleClose]);

  return (
    <div className="cart" data-testid="cart-page" ref={detailsRef}>
      <div className="container">
        <button role="closeButton" onClick={handleClose}>
          <Link to={href} role="closeButton">
            Close
          </Link>
        </button>
        {/* <p>{JSON.stringify(data)}</p> */}

        {/* {data && JSON.stringify(data)} */}
        <h3 data-testid="character-name">{data.attributes.name}</h3>
        <div>
          {data.attributes.image && (
            <img src={data.attributes.image} alt="Character image" />
          )}
          <p data-testid="character-species">
            Species: {data.attributes.species}
          </p>
          {data.attributes.gender && (
            <p data-testid="character-gender">
              Gender: {data.attributes.gender}
            </p>
          )}
          {data.attributes.nationality && (
            <p>Nationality: {data.attributes.nationality}</p>
          )}
          <p>Hair color: {data.attributes.hair_color}</p>
          <p>Eyes color: {data.attributes.eye_color}</p>
          <p>Skin color: {data.attributes.skin_color}</p>
          {data.attributes.wiki && <a href={data.attributes.wiki}>Wiki</a>}
        </div>
      </div>
    </div>
  );
};

export default CharacterDetails;
