// import { getCharacters } from '@/store/api/characterApi';

import { getItems } from '@/api/getItems';

// import { getCharacters } from "@/store/api/characterApi";

export const charactersLoader = async (paramas: string = '', page: number) => {
  const response = await getItems(paramas, page);
  return response;
};
