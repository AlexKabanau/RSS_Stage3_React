import { useEffect } from 'react';
import { useParams, useSearchParams } from 'react-router-dom';
import reactLogo from '../../assets/react.svg';
import { useGetCharacterQuery } from '../../api/redux.api';
import { useAppDispatch } from '../../store/store';
import { setCharacter } from '../../store/slice/characterSlice';

export default function CartPage() {
  const dispatch = useAppDispatch();
  const { id } = useParams(); // Извлекаем id из параметров маршрута
  const [searchParams, setSearchParams] = useSearchParams();

  console.log('ID персонажа:', id);

  const { data, error, isFetching } = useGetCharacterQuery(id || '', {
    skip: !id,
  });

  useEffect(() => {
    if (!id) {
      dispatch(setCharacter(null));
    }
  }, [id, dispatch]);

  const onCloseClick = () => {
    dispatch(setCharacter(null)); // Сбрасываем состояние персонажа
    setSearchParams({}); // Сбрасываем параметры URL
  };

  if (!id) {
    return <p>Пожалуйста, выберите персонажа.</p>;
  }

  return (
    <div className="cart" data-testid="cart-page">
      <div role="container">
        {isFetching && ( // Используйте isFetching для отображения состояния загрузки
          <div role="loading">
            <p>Загрузка...</p>
            <img src={reactLogo} className="logo" alt="loading" />
          </div>
        )}
        {error && (
          <div role="error">
            <p>Произошла ошибка. Пожалуйста, попробуйте снова.</p>
          </div>
        )}
        {data?.data ? (
          <>
            <button role="button" onClick={onCloseClick}>
              Закрыть
            </button>
            <h3>{data.data.attributes.name}</h3>
            <div>
              {data.data.attributes.image && (
                <img
                  src={data.data.attributes.image}
                  alt="Изображение персонажа"
                />
              )}
              <p>Вид: {data.data.attributes.species}</p>
              {data.data.attributes.gender && (
                <p>Пол: {data.data.attributes.gender}</p>
              )}
              {data.data.attributes.nationality && (
                <p>Национальность: {data.data.attributes.nationality}</p>
              )}
              <p>Цвет волос: {data.data.attributes.hair_color}</p>
              <p>Цвет глаз: {data.data.attributes.eye_color}</p>
              <p>Цвет кожи: {data.data.attributes.skin_color}</p>
              {/* <a href={data.data.attributes.wiki}>Wiki</a> */}
            </div>
          </>
        ) : (
          <p>Нет доступных данных о персонаже.</p>
        )}
      </div>
    </div>
  );
}
