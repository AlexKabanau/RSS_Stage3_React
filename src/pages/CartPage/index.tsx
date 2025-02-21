import { useParams, useNavigate } from 'react-router-dom';
import reactLogo from '../../assets/react.svg';
import { useGetCharacterQuery } from '../../api/redux.api';

export default function CartPage() {
  // const dispatch = useAppDispatch();
  const { id } = useParams();
  // const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();

  const { data, error, isFetching, status } = useGetCharacterQuery(id || '', {
    skip: !id,
  });

  const onCloseClick = () => {
    // setSearchParams({});
    navigate('/');
  };

  return (
    <div className="cart" data-testid="cart-page">
      <div role="container">
        {isFetching && (
          <div role="status">
            <p>Loading...</p>
            <img src={reactLogo} className="logo" alt="loading" />
          </div>
        )}
        {error && (
          <div role="error">
            <p>Произошла ошибка. Пожалуйста, попробуйте снова.</p>
          </div>
        )}
        {status === 'fulfilled' && data?.data && (
          <>
            <button role="button" onClick={onCloseClick}>
              Close
            </button>
            <h3 data-testid="character-name">{data.data.attributes.name}</h3>
            <div>
              {data.data.attributes.image && (
                <img src={data.data.attributes.image} alt="Character image" />
              )}
              <p data-testid="character-species">
                Species: {data.data.attributes.species}
              </p>
              {data.data.attributes.gender && (
                <p data-testid="character-gender">
                  Пол: {data.data.attributes.gender}
                </p>
              )}
              {data.data.attributes.nationality && (
                <p>Nationality: {data.data.attributes.nationality}</p>
              )}
              <p>Hair color: {data.data.attributes.hair_color}</p>
              <p>Eyes color: {data.data.attributes.eye_color}</p>
              <p>Skin color: {data.data.attributes.skin_color}</p>
              {data.data.attributes.wiki && (
                <a href={data.data.attributes.wiki}>Wiki</a>
              )}
            </div>
          </>
        )}
      </div>
    </div>
  );
}
