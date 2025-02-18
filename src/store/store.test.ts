import { store } from './store'; // Убедитесь, что путь правильный
import { setSearchParamsToState } from './slice/serchParamsSlice';
import { setLimit, setPage } from './slice/queryParamsSlice';
import { setFavorites } from './slice/favoritsSlice';

describe('Redux Store', () => {
  it('должен иметь начальное состояние', () => {
    const state = store.getState();

    expect(state.searchParams.searchParams).toBe('');
    expect(state.queryParams.page).toBe('1');
    expect(state.queryParams.limit).toBe('10');
    expect(state.favorits.favorits).toEqual([]);
  });

  it('должен обновлять состояние при вызове setSearchParamsToState', () => {
    store.dispatch(setSearchParamsToState('new search parameter'));
    const state = store.getState();

    expect(state.searchParams.searchParams).toBe('new search parameter');
  });

  it('должен обновлять состояние при вызове setLimit и setPage', () => {
    store.dispatch(setLimit('20'));
    store.dispatch(setPage('2'));
    const state = store.getState();

    expect(state.queryParams.limit).toBe('20');
    expect(state.queryParams.page).toBe('2');
  });

  it('должен обновлять состояние при вызове setFavorites', () => {
    store.dispatch(setFavorites(['item1', 'item2']));
    const state = store.getState();

    expect(state.favorits.favorits).toEqual(['item1', 'item2']);
  });
});
