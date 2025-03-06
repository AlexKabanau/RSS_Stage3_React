// import { getCharacters } from '@/store/api/characterApi';

import { getCharacter } from '@/api/getItems';

// import { getCharacters } from "@/store/api/characterApi";

export const characterLoader = async (id: string) => {
  const response = await getCharacter(id);
  return response?.data;
};
