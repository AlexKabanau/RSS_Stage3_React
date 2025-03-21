import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { RootStateType } from '../store';

export enum SortPropertyEnum {
  POPULATION_DESC = 'population',
  POPULATION_ASC = '-population',
  NAME_DESC = 'name',
  NAME_ASC = '-name',
}
export type SortType = {
  name: string;
  sortProperty: SortPropertyEnum;
};

export type FilterItem = {
  name: string;
  filterProperty: FilterPropertyEnum;
};
export enum FilterPropertyEnum {
  ALL = 'All',
  ANTARCTIC = 'Antarctic',
  AMERICAS = 'Americas',
  EUROPE = 'Europe',
  AFRICA = 'Africa',
  ASIA = 'Asia',
  OCEANIA = 'Oceania',
}

export interface FilterSliceState {
  searchValue: string;
  categoryId: FilterItem;
  sort: SortType;
}

const initialState: FilterSliceState = {
  searchValue: '',
  categoryId: {
    name: 'All',
    filterProperty: FilterPropertyEnum.ALL,
  },
  sort: {
    name: 'population',
    sortProperty: SortPropertyEnum.POPULATION_DESC,
  },
};

export const filterSlice = createSlice({
  name: 'filter',
  initialState,
  reducers: {
    setSearchValue: (state, action: PayloadAction<string>) => {
      state.searchValue = action.payload;
    },
    setSort: (state, action: PayloadAction<SortType>) => {
      state.sort = action.payload;
    },
    setFilter: (state, action: PayloadAction<FilterItem>) => {
      state.categoryId = action.payload;
    },
    setFilters: (state, action: PayloadAction<FilterSliceState>) => {
      if (Object.keys(action.payload).length) {
        state.categoryId = action.payload.categoryId;
        state.sort = action.payload.sort;
      } else {
        state.categoryId = {
          name: 'All',
          filterProperty: FilterPropertyEnum.ALL,
        };
        state.sort = {
          name: 'population',
          sortProperty: SortPropertyEnum.POPULATION_DESC,
        };
      }
    },
  },
});

export const selectFilter = (state: RootStateType) => state.filter;
export const selectSort = (state: RootStateType) => state.filter.sort;

export const { setSort, setFilter, setFilters, setSearchValue } =
  filterSlice.actions;

export default filterSlice.reducer;
