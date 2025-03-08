import { getItems } from '@/api/getItems';

export const charactersLoader = async (paramas: string = '', page: number) => {
  const response = await getItems(paramas, page);
  return response;
};
