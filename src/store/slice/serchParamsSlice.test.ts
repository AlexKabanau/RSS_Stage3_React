import { describe, it, expect } from 'vitest';
import searchParamsReducer, {
  setSearchParamsToState,
} from './serchParamsSlice';

describe('searchParamsSlice', () => {
  const initialState = {
    searchParams: '',
    isLoading: false,
    error: '',
  };

  it('должен иметь начальное состояние', () => {
    const nextState = searchParamsReducer(undefined, { type: '' });
    expect(nextState).toEqual(initialState);
  });

  it('должен обновлять searchParams при вызове setSearchParamsToState', () => {
    const newSearchParams = 'New Search Value';
    const action = setSearchParamsToState(newSearchParams);
    const nextState = searchParamsReducer(initialState, action);

    expect(nextState.searchParams).toEqual(newSearchParams);
  });
});
