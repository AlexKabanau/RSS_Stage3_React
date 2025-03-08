import { getCharacter } from '@/api/getItems';

export const characterLoader = async (id: string) => {
  const response = await getCharacter(id);
  return response;
};
