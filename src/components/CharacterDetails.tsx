import React from 'react';
import { useLoaderData } from 'react-router-dom';
// import { characterLoader } from '@/loaders/characterLoader';

const CharacterDetails: React.FC = () => {
  const characterData = useLoaderData(); // Типизируем данные

  return (
    <div>
      {/* Отобразите информацию о персонаже */}
      <h1>{JSON.stringify(characterData)}</h1>
      {/* Другие детали персонажа */}
    </div>
  );
};

export default CharacterDetails;
