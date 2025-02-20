import { RootStateType } from '../store';
import { characterSelectors } from './chracterSelectors';

describe('characterSelectors', () => {
  it('should return character state', () => {
    const mockState: RootStateType = {
      character: {
        response: {
          data: {
            id: '',
            type: '',
            attributes: {
              slug: '',
              alias_names: [],
              animagus: null,
              blood_status: null,
              boggart: null,
              born: null,
              died: null,
              eye_color: null,
              family_members: [],
              gender: null,
              hair_color: null,
              height: null,
              house: null,
              image: null,
              jobs: [],
              marital_status: null,
              name: '',
              nationality: null,
              patronus: null,
              romances: [],
              skin_color: null,
              species: null,
              titles: [],
              wands: [],
              weight: null,
              wiki: null,
            },
            links: {
              self: '',
            },
          },
          meta: {
            pagination: { current: 1, records: 0 },
            copyright: 'some copyright',
            generated_at: '2025-02-18',
          },
          links: {
            self: '',
            current: '',
            first: '',
            last: '',
            next: '',
            prev: '',
          },
        },
        status: 'loading',
        error: null,
      },
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
      characters: {
        response: {
          data: [],
          meta: {
            pagination: undefined,
            copyright: '',
            generated_at: '',
          },
          links: {
            self: '',
            current: undefined,
            next: undefined,
            last: undefined,
            first: undefined,
            prev: undefined,
          },
        },
        status: 'error',
      },
    };

    const result = characterSelectors(mockState);

    expect(result).toEqual(mockState.character);
  });
});
