import axios from 'axios';
import {
  DEFAULT_CURRENT_PAGE,
  RESOURCES_PER_PAGE,
  URL,
} from '../constants/constants';

export type AttributesType = {
  slug: string;
  alias_names: string[];
  animagus: string | null;
  blood_status: string | null;
  boggart: string | null;
  born: string | null;
  died: string | null;
  eye_color: string | null;
  family_members: string[];
  gender: string | null;
  hair_color: string | null;
  height: string | null;
  house: string | null;
  image: string | null;
  jobs: string[];
  marital_status: string | null;
  name: string;
  nationality: string | null;
  patronus: string | null;
  romances: string[];
  skin_color: string | null;
  species: string | null;
  titles: string[];
  wands: string[];
  weight: string | null;
  wiki: string | null;
};

type LinkType = {
  self: string;
};
export type ResponseType = {
  id: string;
  type: string;
  attributes: AttributesType;
  links: LinkType;
};

type PaginationType = {
  current: number;
  next: number;
  last: number;
  records: number;
};

type MetaType = {
  pagination: PaginationType;
  copyright: string;
  generated_at: string;
};

type LinksType = {
  self: string;
  current: string;
  next: string;
  last: string;
};

export type ResponseInfoType = {
  data: ResponseType[];
  meta: MetaType;
  links: LinksType;
};

export type GetCharacterType = {
  data: ResponseType;
  meta: MetaType;
  links: LinksType;
};

export const getTotalInfo = async () // params: string,
// page: number = 1
: Promise<ResponseInfoType> => {
  // let response;
  // if (page > 1) {
  const response = await axios(`${URL.baseUrl}${URL.props}`);
  // } else {
  //   response = await axios(`${URL.baseUrl}${URL.props}${URL.search}${params}`);
  // }
  return response.data;
};

// export const getItems = async (
//   params: string,
//   page: number = DEFAULT_CURRENT_PAGE
// ): Promise<ResponseInfoType> => {
//   const response = await axios(
//     `${URL.baseUrl}${URL.props}${URL.search}${params}`
//   );
//   return response.data;
// };
export const getItems = async (
  params: string,
  page: number = DEFAULT_CURRENT_PAGE
): Promise<ResponseInfoType> => {
  const response = await axios(
    `${URL.baseUrl}${URL.props}${URL.ammount}${RESOURCES_PER_PAGE}${URL.currentPage}${page}${URL.search}${params}`
  );
  return response.data;
};

export const getCharacter = async (
  id: string
): Promise<GetCharacterType | undefined> => {
  const response = await axios(`${URL.baseUrl}${URL.props}/${id}`);
  return response.data;
};
// export const getItems = async (params: string): Promise<ResponseType[]> => {
//   const response = await axios(
//     `${URL.baseUrl}${URL.props}${URL.search}${params}`
//   );
//   return response.data.results;
// };
