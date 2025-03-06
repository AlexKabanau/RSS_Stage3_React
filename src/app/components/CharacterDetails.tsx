'use client';

import { GetCharacterType } from '@/api/getItems';
// import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import React, {
  useCallback,
  useEffect,
  // useMemo,
  useRef,
  // useState,
} from 'react';

const CharacterDetails: React.FC<{ characterData: GetCharacterType }> = ({
  characterData,
}) => {
  // const router = useRouter();
  // const { page, search } = router.query;
  const data = characterData.data;
  // const href = useMemo(
  //   () =>
  //     search
  //       ? {
  //           pathname: '/',
  //           query: {
  //             page: page || '1',
  //             search: search || '',
  //           },
  //         }
  //       : {
  //           pathname: '/',
  //           query: {
  //             page: page || '1',
  //           },
  //         },
  //   [page, search]
  // );

  // const [isOpen, setIsOpen] = useState(true); // Состояние для управления видимостью

  // const closeDetails = useCallback(() => {
  //   setIsOpen(false);
  //   // router.push(href);
  // }, [router, href]);
  const searchParams = useSearchParams();
  const page = searchParams?.get('page');
  const search = searchParams?.get('search');
  const href = search
    ? `/?page=${page || 1}&search=${search || ''}`
    : `/?page=${page || 1}`;
  const router = useRouter();

  const detailsRef = useRef<HTMLDivElement>(null);
  const handleClose = useCallback(() => {
    // Удаление ID из строки запроса
    router.push(href); // Измените путь на нужный, если необходимо
  }, [router, href]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        detailsRef.current &&
        !detailsRef.current.contains(event.target as Node)
      ) {
        console.log('Should close details');
        handleClose();
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [handleClose]);

  // if (!isOpen) return null; // Не рендерим компонент, если он закрыт

  return (
    <div
      className="cart"
      data-testid="cart-page"
      ref={detailsRef} // Привязываем ref к контейнеру
    >
      <div className="container">
        <button role="closeButton" onClick={handleClose}>
          {/* <Link href={href} role="closeButton"> */}
          Close
          {/* </Link> */}
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
