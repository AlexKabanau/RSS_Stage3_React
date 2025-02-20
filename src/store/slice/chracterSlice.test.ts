import characterReducer, {
  fetchItem,
  setCharacter,
  delCharacter,
} from './characterSlice';
import { GetCharacterType } from '../../api/getItems';

type initialStateType = {
  response: GetCharacterType;
  status: 'loading' | 'success' | 'error';
  error: string | null;
};

describe('character slice', () => {
  const initialState: initialStateType = {
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
        pagination: {
          current: 1,
          records: 0,
        },
        copyright: 'some copyright',
        generated_at: '2025-02-18',
      },
      links: {
        self: '',
        current: '',
        next: '',
        last: '',
        first: '',
        prev: '',
      },
    },
    status: 'loading',
    error: null,
  };

  it('should handle initial state', () => {
    const actual = characterReducer(undefined, { type: 'unknown' });
    expect(actual).toEqual(initialState); // Убедитесь, что actual соответствует initialState
  });

  it('should handle setChracter', () => {
    const character: GetCharacterType = {
      data: {
        id: '1',
        type: 'character',
        attributes: {
          slug: 'example-character',
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
          name: 'Example Character',
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
        pagination: { current: 1, records: 10 },
        copyright: 'some copyright',
        generated_at: '2025-02-18',
      },
      links: {
        self: '',
        current: '',
        next: '',
        last: '',
        first: '',
        prev: '',
      },
    };

    const actual = characterReducer(initialState, setCharacter(character));
    expect(actual.response).toEqual(character);
  });

  it('should handle delChracter', () => {
    const stateBefore = {
      ...initialState,
      response: {
        data: {
          id: '1',
          type: 'character',
          attributes: {
            slug: 'example-slug',
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
            name: 'Example Name',
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
            self: 'https://example.com',
          },
        },
        links: {
          self: '',
          current: undefined,
          first: undefined,
          last: undefined,
          next: undefined,
          prev: undefined,
        },
        meta: {
          copyright: 'some copyright',
          generated_at: '2025-02-18',
          pagination: {
            current: 1,
            records: 1,
          },
        },
      },
    };
    // const actual = characterReducer(initialState, delCharacter());
    // const expected = {
    //   ...initialState,
    //   response: {
    //     ...initialState.response,
    //     links: {
    //       ...initialState.response.links,
    //       current: undefined, // Приводим undefined к пустой строке
    //       first: undefined,
    //       last: undefined,
    //       next: undefined,
    //       prev: undefined,
    //     },
    //     meta: {
    //       ...initialState.response.meta,
    //       copyright: '',
    //       generated_at: '',
    //       pagination: undefined,
    //     },
    //   },
    // };

    // Проверяем только актуальные изменения в состоянии
    // expect(actual.response).toEqual(initialState.response);
    const actual = characterReducer(stateBefore, delCharacter());
    expect(actual.response).toEqual(initialState.response);
  });

  // it('should handle fetchItem pending', () => {
  //   const actual = characterReducer(
  //     initialState,
  //     fetchItem.pending('', { id: '1' })
  //   );
  //   expect(actual.status).toEqual('loading');
  // });

  // it('should handle fetchItem fulfilled', () => {
  //   const character: GetCharacterType = {
  //     data: {
  //       id: '1',
  //       type: 'character',
  //       attributes: {
  //         slug: 'example-character',
  //         alias_names: [],
  //         animagus: null,
  //         blood_status: null,
  //         boggart: null,
  //         born: null,
  //         died: null,
  //         eye_color: null,
  //         family_members: [],
  //         gender: null,
  //         hair_color: null,
  //         height: null,
  //         house: null,
  //         image: null,
  //         jobs: [],
  //         marital_status: null,
  //         name: 'Example Character',
  //         nationality: null,
  //         patronus: null,
  //         romances: [],
  //         skin_color: null,
  //         species: null,
  //         titles: [],
  //         wands: [],
  //         weight: null,
  //         wiki: null,
  //       },
  //       links: {
  //         self: '',
  //       },
  //     },
  //     meta: {
  //       pagination: { current: 1, records: 10 },
  //       copyright: 'some copyright',
  //       generated_at: '2025-02-18',
  //     },
  //     links: {
  //       self: '',
  //       current: '',
  //       next: '',
  //       last: '',
  //       first: '',
  //       prev: '',
  //     },
  //   };

  //   const actual = characterReducer(
  //     initialState,
  //     fetchItem.fulfilled(character, '', { id: '1' })
  //   );
  //   expect(actual.status).toEqual('success');
  //   expect(actual.response).toEqual(character);
  // });

  // it('should handle fetchItem rejected', () => {
  //   const errorMessage = 'Error fetching item';
  //   const actual = characterReducer(
  //     initialState,
  //     fetchItem.rejected(new Error(errorMessage), '', { id: '1' })
  //   );
  //   expect(actual.status).toEqual('error');
  // });
});
