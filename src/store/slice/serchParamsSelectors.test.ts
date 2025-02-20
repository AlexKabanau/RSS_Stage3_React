import { queryParamsSelectors } from './queryParamsSelectors';
import { RootStateType } from '../store';

describe('queryParamsSelectors', () => {
  it('должен возвращать queryParams из состояния', () => {
    const initialState: RootStateType = {
      queryParams: {
        search: 'Harry Potter',
        limit: '10',
        page: '1',
        isLoading: false,
        error: '',
      },
    } as RootStateType;

    const result = queryParamsSelectors(initialState);

    expect(result).toEqual(initialState.queryParams);
  });
});
