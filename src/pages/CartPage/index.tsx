import { useEffect } from 'react';
import { useParams } from 'react-router';
// import { getCharacter, GetCharacterType } from '../../api/getItems';
import reactLogo from '../../assets/react.svg';
import { useAppDispatch } from '../../store/store';
import { useSelector } from 'react-redux';
import { characterSelectors } from '../../store/slice/chracterSelectors';
import { fetchItem, setCharacter } from '../../store/slice/characterSlice';
// import { DEFAULT_PAGE } from '../../constants/constants';

export default function CartPage() {
  const dispatch = useAppDispatch();

  const { response, status } = useSelector(characterSelectors);
  const { id } = useParams();
  // const [character, setCharacter] = useState<GetCharacterType | undefined>(
  //   undefined
  // );
  // const [isLoading, setIsLoading] = useState(false);
  // const [visible, setVisible] = useState(true);
  // const navigate = useNavigate();

  // const [searchParams, setSearchParams] = useSearchParams();

  useEffect(() => {
    if (id) dispatch(fetchItem({ id: id }));
  }, [id, dispatch]);

  // useEffect(() => {
  //   const getData = async () => {
  //     try {
  //       if (id) {
  //         setIsLoading(true);
  //         const response = await getCharacter(id);
  //         setIsLoading(false);
  //         setCharacter(response);
  //       }
  //     } catch (error) {
  //       setIsLoading(false);
  //       console.error(error);
  //     }
  //   };
  //   getData();
  // }, [id]);
  const onCloseClick = () => {
    dispatch(setChracter(''));

    // const currentSearch = searchParams.get('search') || '';
    // setSearchParams({ search: currentSearch, page: DEFAULT_PAGE.toString() });
    // navigate('/');
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
