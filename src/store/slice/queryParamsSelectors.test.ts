import { describe, it, expect } from 'vitest';
import { RootStateType } from '../store';
import { queryParamsSelectors } from './queryParamsSelectors';

describe('queryParamsSelectors', () => {
  it('должен возвращать queryParams из состояния', () => {
    const mockState: RootStateType = {
      queryParams: {
        limit: '20',
        page: '1',
        isLoading: false,
        error: '',
        search: 'Harry Potter',
      },
      // Добавляем другие части состояния, если необходимо
    } as RootStateType;

    const selectedQueryParams = queryParamsSelectors(mockState);

    expect(selectedQueryParams).toEqual(mockState.queryParams);
  });
});
