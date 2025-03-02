import { GetCharacterType } from '@/api/getItems';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { useEffect, useRef, useState } from 'react';

const CharacterDetails: React.FC<{ characterData: GetCharacterType }> = ({
  characterData,
}) => {
  const router = useRouter();
  const { page, search } = router.query;
  const data = characterData.data;
  const href = search
    ? {
        pathname: '/',
        query: {
          page: page || '1',
          search: search || '',
        },
      }
    : {
        pathname: '/',
        query: {
          page: page || '1',
        },
      };

  const [isOpen, setIsOpen] = useState(true); // Состояние для управления видимостью

  const closeDetails = () => {
    setIsOpen(false);
    router.push(href);
  };

  const detailsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        detailsRef.current &&
        !detailsRef.current.contains(event.target as Node)
      ) {
        closeDetails();
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [closeDetails]);

  if (!isOpen) return null; // Не рендерим компонент, если он закрыт
  return (
    <div
      className="cart"
      data-testid="cart-page"
      ref={detailsRef} // Привязываем ref к контейнеру
    >
      <div className="container">
        <button role="button">
          <Link href={href}>Close</Link>
        </button>
        {/* {JSON.stringify(data)} */}
        <h3 data-testid="character-name">{data.attributes.name}</h3>
        <div>
          {data.attributes.image && (
            <img src={data.attributes.image} alt="Character image" />
          )}
          <p data-testid="character-species">
            Species: {data.attributes.species}
          </p>
          {data.attributes.gender && (
            <p data-testid="character-gender">Пол: {data.attributes.gender}</p>
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
