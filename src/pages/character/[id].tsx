// import { useParams, useNavigate } from 'react-router-dom';
// import reactLogo from '../../../public/react.svg';
import {
  CharacterResponseType,
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
import CharacterDetails from '@/components/CharacterDetails';

// return {
//   props: {
//     charactersData: characters?.data,
//     characterData: character?.data,
//   },
// };

export default function CartPage(data: {
  charactersData: ResponseInfoType;
  characterData: GetCharacterType;
}) {
  const { charactersData, characterData } = data;
  return (
    <Layout data={charactersData}>
      <CharacterDetails characterData={characterData} />
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
    // console.log(page, search, id);

    const characters = await store.dispatch(
      getCharacters.initiate({
        page: checkRouterElement(page, '1'),
        searchParams: checkRouterElement(search, ''),
      })
    );
    const character = await store.dispatch(
      getCharacter.initiate({ id: checkRouterElement(id, '') })
    );
    console.log('page', page, 'search', search);
    await Promise.all(store.dispatch(reduxApi.util.getRunningQueriesThunk()));

    return {
      props: {
        charactersData: characters?.data,
        characterData: character?.data,
      },
    };
  }
);
