// import { getCharacters } from '@/store/api/characterApi';

import { getItems } from '@/api/getItems';

// import { getCharacters } from "@/store/api/characterApi";

export const characterLoader = async (
  paramas: string = '',
  page: number = 1
) => {
  const response = await getItems(paramas, page);
  return response?.data;
};
