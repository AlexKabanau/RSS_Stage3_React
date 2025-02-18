// import { characterSelectors } from './path/to/your/selectors'; // обновите путь к селектору
import { RootStateType } from '../store'; // обновите путь к типу состояния
import { characterSelectors } from './chracterSelectors';

describe('characterSelectors', () => {
  it('should return character state', () => {
    // Создаем пример состояния
    const mockState: RootStateType = {
      // заполняем другие части состояния, если они нужны
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
      // isLoading: false,
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

    // Вызываем селектор
    const result = characterSelectors(mockState);

    // Проверяем, что результат соответствует ожидаемому
    expect(result).toEqual(mockState.character);
  });
});
