import axios from 'axios';
import { URL } from '../constants/constants';

export type ResponseType = {
  name: string;
  model: string;
  starship_class: string;
  manufacturer: string;
  cost_in_credits: string;
  length: string;
  crew: string;
  passengers: string;
  max_atmosphering_speed: string;
  hyperdrive_rating: string;
  MGLT: string;
  cargo_capacity: string;
  consumables: string;
  films: Array<string>;
  pilots: Array<string>;
  url: string;
  created: string;
};

export type ResponseInfoType = {
  count: number;
  next: string;
  previous: string | null;
  results: ResponseType[];
};

export const getTotalInfo = async (
  params: string,
  page: number = 1
): Promise<ResponseInfoType> => {
  let response;
  if (page > 1) {
    response = await axios(
      `${URL.baseUrl}${URL.props}${URL.search}${params}${URL.page}${page}`
    );
  } else {
    response = await axios(`${URL.baseUrl}${URL.props}${URL.search}${params}`);
  }
  return response.data;
};

export const getItems = async (params: string): Promise<ResponseType[]> => {
  return (await getTotalInfo(params)).results;
};
// export const getItems = async (params: string): Promise<ResponseType[]> => {
//   const response = await axios(
//     `${URL.baseUrl}${URL.props}${URL.search}${params}`
//   );
//   return response.data.results;
// };
