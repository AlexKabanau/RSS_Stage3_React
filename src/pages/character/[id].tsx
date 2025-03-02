// import { useParams, useNavigate } from 'react-router-dom';
// import reactLogo from '../../../public/react.svg';
import {
  getCharacter,
  getCharacters,
  reduxApi,
  // useGetCharacterQuery,
} from '../../store/api/characterApi';
import Layout from '../layout';
import { wrapper } from '@/store/store';
import { checkRouterElement } from '@/utils/checkRouterElement';
import { GetCharacterType, ResponseInfoType } from '@/api/getItems';
import Link from 'next/link';

export default function CartPage(props: {
  charactersData: ResponseInfoType;
  characterData: GetCharacterType;
}) {
  // const dispatch = useAppDispatch();
  // const { id } = useParams();
  // // const [searchParams, setSearchParams] = useSearchParams();
  // // const navigate = useNavigate();

  // const { data, error, isFetching, status } = useGetCharacterQuery(id || '', {
  //   skip: !id,
  // });

  // const onCloseClick = () => {
  // setSearchParams({});
  // navigate('/');
  // };

  const { charactersData, characterData } = props;
  return (
    <Layout data={charactersData}>
      <div className="cart" data-testid="cart-page">
        <div className="container">
          <button role="button">
            <Link href={'/'}>Close</Link>
          </button>
          <h3 data-testid="character-name">
            {characterData.data.attributes.name}
          </h3>
          <div>
            {characterData.data.attributes.image && (
              <img
                src={characterData.data.attributes.image}
                alt="Character image"
              />
            )}
            <p data-testid="character-species">
              Species: {characterData.data.attributes.species}
            </p>
            {characterData.data.attributes.gender && (
              <p data-testid="character-gender">
                Пол: {characterData.data.attributes.gender}
              </p>
            )}
            {characterData.data.attributes.nationality && (
              <p>Nationality: {characterData.data.attributes.nationality}</p>
            )}
            <p>Hair color: {characterData.data.attributes.hair_color}</p>
            <p>Eyes color: {characterData.data.attributes.eye_color}</p>
            <p>Skin color: {characterData.data.attributes.skin_color}</p>
            {characterData.data.attributes.wiki && (
              <a href={characterData.data.attributes.wiki}>Wiki</a>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );

  // return (
  // <div className="cart" data-testid="cart-page">
  //   <div role="container">
  //     {isFetching && (
  //       <div role="status">
  //         <p>Loading...</p>
  //         <img src={reactLogo} className="logo" alt="loading" />
  //       </div>
  //     )}
  //     {error && (
  //       <div role="error">
  //         <p>Произошла ошибка. Пожалуйста, попробуйте снова.</p>
  //       </div>
  //     )}
  //     {status === 'fulfilled' && data?.data && (
  //       <>
  //         <button role="button" onClick={onCloseClick}>
  //           Close
  //         </button>
  //         <h3 data-testid="character-name">{data.data.attributes.name}</h3>
  //         <div>
  //           {data.data.attributes.image && (
  //             <img src={data.data.attributes.image} alt="Character image" />
  //           )}
  //           <p data-testid="character-species">
  //             Species: {data.data.attributes.species}
  //           </p>
  //           {data.data.attributes.gender && (
  //             <p data-testid="character-gender">
  //               Пол: {data.data.attributes.gender}
  //             </p>
  //           )}
  //           {data.data.attributes.nationality && (
  //             <p>Nationality: {data.data.attributes.nationality}</p>
  //           )}
  //           <p>Hair color: {data.data.attributes.hair_color}</p>
  //           <p>Eyes color: {data.data.attributes.eye_color}</p>
  //           <p>Skin color: {data.data.attributes.skin_color}</p>
  //           {data.data.attributes.wiki && (
  //             <a href={data.data.attributes.wiki}>Wiki</a>
  //           )}
  //         </div>
  //       </>
  //     )}
  //   </div>
  // </div>
  // );
}

export const getServerSideProps = wrapper.getServerSideProps(
  (store) => async (context) => {
    const { page, search, id } = context.query;

    const characters = await store.dispatch(
      getCharacters.initiate({
        page: checkRouterElement(page, '1'),
        searchParams: checkRouterElement(search, ''),
      })
    );
    const character = await store.dispatch(
      getCharacter.initiate({ id: checkRouterElement(id, '') })
    );
    await Promise.all(store.dispatch(reduxApi.util.getRunningQueriesThunk()));

    return {
      props: {
        charactersData: characters?.data,
        characterData: character?.data,
      },
    };
  }
);
