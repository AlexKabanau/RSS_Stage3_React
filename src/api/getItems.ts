import axios from 'axios';
import {
  DEFAULT_CURRENT_PAGE,
  RESOURCES_PER_PAGE,
  URL,
} from '../constants/constants';

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

export type ResponseType = {
  id: string;
  type: string;
  attributes: AttributesType;
  links: LinkType;
};

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

export type LinkType = {
  self: string;
};

type MetaType = {
  pagination?: PaginationType;
  copyright: string;
  generated_at: string;
};

type PaginationType = {
  current: number;
  next?: number;
  last?: number;
  records: number;
  first?: number;
  prev?: number;
};

type LinksType = {
  self: string;
  current?: string;
  next?: string;
  last?: string;
  first?: string;
  prev?: string;
};

export const getTotalInfo = async (): Promise<ResponseInfoType> => {
  const response = await axios(`${URL.baseUrl}${URL.props}`);
  return response.data;
};

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
