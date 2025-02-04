import axios from 'axios';
import { URL } from '../constants/url';

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

export const getItems = async (params: string): Promise<ResponseType[]> => {
  const response = await axios(
    `${URL.baseUrl}${URL.props}${URL.search}${params}`
  );
  return response.data.results;
};
