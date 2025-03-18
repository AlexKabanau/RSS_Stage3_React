import { RootStateType } from '../store';
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchCountries = createAsyncThunk<
  Country[],
  SearchCountriesParams
>('countries/fetchCounriesStatus', async () => {
  const { data } = await axios.get<Country[]>(
    `https://restcountries.com/v3.1/all`
  );
  return data;
});

export type Country = {
  name: Name;
  tld?: string[];
  cca2: string;
  ccn3?: string;
  cca3: string;
  independent?: boolean;
  status: CountryStatus;
  unMember: boolean;
  currencies?: { [key: string]: Currency };
  idd: Idd;
  capital?: string[];
  altSpellings: string[];
  region: Region;
  languages?: { [key: string]: string };
  translations: { [key: string]: Translation };
  latlng: number[];
  landlocked: boolean;
  area: number;
  demonyms?: Demonyms;
  flag: string;
  maps: Maps;
  population: number;
  car: Car;
  timezones: string[];
  continents: Continent[];
  flags: Flags;
  coatOfArms: CoatOfArms;
  startOfWeek: StartOfWeek;
  capitalInfo: CapitalInfo;
  cioc?: string;
  subregion?: string;
  fifa?: string;
  borders?: string[];
  gini?: { [key: string]: number };
  postalCode?: PostalCode;
};

export interface CapitalInfo {
  latlng?: number[];
}

export interface Car {
  signs?: string[];
  side: Side;
}

export enum Side {
  Left = 'left',
  Right = 'right',
}

export interface CoatOfArms {
  png?: string;
  svg?: string;
}

export enum Continent {
  Africa = 'Africa',
  Antarctica = 'Antarctica',
  Asia = 'Asia',
  Europe = 'Europe',
  NorthAmerica = 'North America',
  Oceania = 'Oceania',
  SouthAmerica = 'South America',
}

export interface Currency {
  name: string;
  symbol: string;
}

export interface Demonyms {
  eng: Eng;
  fra?: Eng;
}

export interface Eng {
  f: string;
  m: string;
}

export interface Flags {
  png: string;
  svg: string;
  alt?: string;
}

export interface Idd {
  root?: string;
  suffixes?: string[];
}

export interface Maps {
  googleMaps: string;
  openStreetMaps: string;
}

export interface Name {
  common: string;
  official: string;
  nativeName?: { [key: string]: Translation };
}

export interface Translation {
  official: string;
  common: string;
}

export interface PostalCode {
  format: string;
  regex?: string;
}

export enum Region {
  Africa = 'Africa',
  Americas = 'Americas',
  Antarctic = 'Antarctic',
  Asia = 'Asia',
  Europe = 'Europe',
  Oceania = 'Oceania',
}

export enum StartOfWeek {
  Monday = 'monday',
  Saturday = 'saturday',
  Sunday = 'sunday',
}

export enum CountryStatus {
  OfficiallyAssigned = 'officially-assigned',
  UserAssigned = 'user-assigned',
}

export enum Status {
  LOADING = 'loading',
  SUCCESS = 'success',
  ERROR = 'error',
}

interface CountrySlicState {
  items: Country[];
  status: Status;
}

const initialState: CountrySlicState = {
  items: [],
  status: Status.LOADING, // loading | success | error
};

export type SearchCountriesParams = {
  sortBy: string;
  order: string;
  filter: string;
};

export const countriesSlice = createSlice({
  name: 'countries',
  initialState,
  reducers: {
    setItems: (state, action) => {
      state.items = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchCountries.pending, (state) => {
      state.status = Status.LOADING;
      state.items = [];
    });
    builder.addCase(fetchCountries.fulfilled, (state, action) => {
      state.status = Status.SUCCESS;
      state.items = action.payload;
    });

    builder.addCase(fetchCountries.rejected, (state) => {
      state.status = Status.ERROR;
      state.items = [];
    });
  },
});

export const selectCountriesData = (state: RootStateType) => state.countries;

// Action creators are generated for each case reducer function
export const { setItems } = countriesSlice.actions;

export default countriesSlice.reducer;
