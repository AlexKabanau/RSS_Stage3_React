import { describe, it, expect } from 'vitest';
import queryParamsReducer, {
  setLimit,
  setPage,
  setQueryParamsToState,
} from './queryParamsSlice';
import { DEFAULT_PAGE, RESOURCES_PER_PAGE } from '../../constants/constants';

describe('queryParamsSlice', () => {
  it('должен возвращать начальное состояние', () => {
    const initialState = queryParamsReducer(undefined, { type: '@@INIT' }); // Указываем type как строку
    expect(initialState).toEqual({
      limit: RESOURCES_PER_PAGE.toString(),
      page: DEFAULT_PAGE.toString(),
      isLoading: false,
      error: '',
      search: '',
    });
  });

  it('должен изменять limit через setLimit', () => {
    const previousState = {
      limit: RESOURCES_PER_PAGE.toString(),
      page: DEFAULT_PAGE.toString(),
      isLoading: false,
      error: '',
      search: '',
    };

    const newState = queryParamsReducer(previousState, setLimit('50'));
    expect(newState.limit).toBe('50');
  });

  it('должен изменять page через setPage', () => {
    const previousState = {
      limit: RESOURCES_PER_PAGE.toString(),
      page: DEFAULT_PAGE.toString(),
      isLoading: false,
      error: '',
      search: '',
    };

    const newState = queryParamsReducer(previousState, setPage('3'));
    expect(newState.page).toBe('3');
  });

  it('должен изменять page и search через setQueryParamsToState', () => {
    const previousState = {
      limit: RESOURCES_PER_PAGE.toString(),
      page: DEFAULT_PAGE.toString(),
      isLoading: false,
      error: '',
      search: '',
    };

    const newState = queryParamsReducer(
      previousState,
      setQueryParamsToState({ page: '2', search: 'Harry Potter' })
    );

    expect(newState.page).toBe('2');
    expect(newState.search).toBe('Harry Potter');
  });
});
