import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router';
import { getCharacter, GetCharacterType } from '../../api/getItems';
import reactLogo from '../../assets/react.svg';

export default function CartPage() {
  const { id } = useParams();
  const [character, setCharacter] = useState<GetCharacterType | undefined>(
    undefined
  );
  const [isLoading, setIsLoading] = useState(false);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const getData = async () => {
      try {
        if (id) {
          setIsLoading(true);
          const response = await getCharacter(id);
          setIsLoading(false);
          setCharacter(response);
        }
      } catch (error) {
        setIsLoading(false);
        console.error(error);
      }
    };
    getData();
  }, [id]);
  return (
    <div className="cart">
      <button onClick={() => setVisible(!visible)}>
        {!visible ? 'Show' : 'Hide'}
      </button>
      <div className={visible ? 'visible' : 'hidden'}>
        {isLoading && (
          <div>
            <p>Loading...</p>
            <img src={reactLogo} className="logo" alt="loading" />
          </div>
        )}
        {
          character && (
            <>
              <h3>{JSON.stringify(character.data.attributes.name)}</h3>
              <div>
                {character.data.attributes.image && (
                  <img
                    src={`${character.data.attributes.image}`}
                    alt="Character image"
                  />
                )}
                <p>Species: {character.data.attributes.species}</p>
                {character.data.attributes.gender && (
                  <p>Gender: {character.data.attributes.gender}</p>
                )}
                {character.data.attributes.nationality && (
                  <p>Nationality: {character.data.attributes.nationality}</p>
                )}
                <p>Hair color: {character.data.attributes.hair_color}</p>
                <p>Eye color: {character.data.attributes.eye_color}</p>
                <p>Skin color: {character.data.attributes.skin_color}</p>
                <Link to={`${character.data.attributes.wiki}`}>Wiki</Link>
              </div>
            </>
          )
          // Object.entries(character.data.attributes).map(([key, value]) => {
          //   return (
          //     <div key={key}>
          //       <p>
          //         {key}: {JSON.stringify(value)}
          //       </p>
          //     </div>
          //   );
          // })
        }
      </div>

      {/* {id} {character?.data.attributes.name} */}
    </div>
  );
}
