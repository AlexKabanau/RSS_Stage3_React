import { describe, it, expect } from 'vitest';
import { favoritsSelectors } from './favoritsSelectors';
import { RootStateType } from '../store';
import { firstCharacter, secondCharacter } from '../../mock/mock';

describe('favoritsSelectors', () => {
  it('должен вернуть список избранных элементов из состояния', () => {
    const mockState: RootStateType = {
      favorits: {
        favorits: [firstCharacter, secondCharacter],
      },
    } as RootStateType;

    const selectedFavorits = favoritsSelectors(mockState);

    expect(selectedFavorits).toEqual([firstCharacter, secondCharacter]);
  });

  it('должен вернуть пустой массив, если избранные элементы отсутствуют', () => {
    const mockState: RootStateType = {
      searchParams: {
        searchParams: '',
        isLoading: false,
        error: '',
      },
      queryParams: {
        search: '',
        limit: '',
        page: '',
        isLoading: false,
        error: '',
      },
      favorits: {
        favorits: [],
      },
      api: {
        queries: {},
        mutations: {},
        provided: {},
        subscriptions: {},
        config: {
          reducerPath: 'api',
          online: false,
          focused: false,
          middlewareRegistered: false,
          refetchOnMountOrArgChange: false,
          refetchOnReconnect: false,
          refetchOnFocus: false,
          invalidationBehavior: 'immediately',
          keepUnusedDataFor: 0,
        },
      },
    };

    const selectedFavorits = favoritsSelectors(mockState);

    expect(selectedFavorits).toEqual([]);
  });
});
