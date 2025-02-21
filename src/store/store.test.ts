import { store } from './store';
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
    store.dispatch(
      setFavorites([
        {
          id: '643ae975-0c29-49a7-a87e-d052b798962d',
          type: 'character',
          attributes: {
            slug: 'george-weasley-s-dance-partner',
            alias_names: [],
            animagus: null,
            blood_status: null,
            boggart: null,
            born: 'Before 1994',
            died: null,
            eye_color: null,
            family_members: [],
            gender: 'Female',
            hair_color: 'Black',
            height: null,
            house: null,
            image: null,
            jobs: [],
            marital_status: null,
            name: "George Weasley's dance partner",
            nationality: null,
            patronus: null,
            romances: [],
            skin_color: 'Light',
            species: 'Human',
            titles: [],
            wands: [],
            weight: null,
            wiki: "https://harrypotter.fandom.com/wiki/George_Weasley's_dance_partner",
          },
          links: {
            self: '/v1/characters/643ae975-0c29-49a7-a87e-d052b798962d',
          },
        },
        {
          id: '49ce06a5-f08b-4475-8e79-72a2b0733c5d',
          type: 'character',
          attributes: {
            slug: 'ginevra-weasley',
            alias_names: [
              'Ginny (by family & friends)',
              'Gin (by Harry Potter)',
              'Skinny Ginny (by Ronald Weasley)',
            ],
            animagus: null,
            blood_status: 'Pure-blood',
            boggart: 'Lord Voldemort',
            born: '11 August 1981, Great Britain',
            died: null,
            eye_color: 'Bright brown',
            family_members: [
              'Arthur Weasley (father)',
              'Molly Weasley (née Prewett) (mother)',
              'William Weasley (older brother)',
              'Charles Weasley (older brother)',
              'Percy Weasley (older brother)',
              'Fred Weasley (older brother) †',
              'George Weasley (older brother)',
              'Ronald Weasley (older brother)',
              'Harry Potter (husband)',
              'James Potter (II) (son)',
              'Albus Potter (son)',
              'Lily Potter (II) (daughter)',
              'James Potter (I) (father-in-law) †',
              'Lily Potter (I) (née Evans) (mother-in-law) †',
              'Fleur Weasley (née Delacour) (sister-in-law)',
              'Audrey Weasley (sister-in-law)',
              'Angelina Weasley (née Johnson) (sister-in-law)',
              'Hermione Granger (sister-in-law)',
              'Padma Patil (sister-in-law in alternate timeline)',
              'Victoire Weasley (niece)',
              'Dominique Weasley (niece)',
              'Louis Weasley (nephew)',
              'Molly Weasley (II) (niece)',
              'Lucy Weasley (niece)',
              'Fred Weasley (II) (nephew)',
              'Roxanne Weasley (niece)',
              'Rose Granger-Weasley (niece)',
              'Hugo Granger-Weasley (nephew)',
              'Panju Weasley (nephew in alternate timeline)',
              'Two paternal uncles',
              'Fabian Prewett (maternal uncle) †',
              'Gideon Prewett (maternal uncle) †',
              'Bilius (uncle or uncle by marriage) †',
              'Uncle or uncle by marriage',
              'First cousin',
              'Septimus Weasley (paternal grandfather)',
              'Cedrella Weasley (née Black) (paternal grandmother)',
              'Maternal grandfather',
              'Matilda Weasley (possible relative)',
              'G. Weasley (possible relative)',
              'Garreth Weasley (possible relative)',
              'Possible relative',
              'Possible relatives',
              'Hector Weasley (possible relative)',
              'Weasley family (paternal family)',
              'Prewett family (maternal family)',
              'Potter family (in-laws/descendants)',
            ],
            gender: 'Female',
            hair_color: 'Red',
            height: null,
            house: 'Gryffindor',
            image:
              'https://static.wikia.nocookie.net/harrypotter/images/8/8b/Ginny_Weasley_hbp_promo.jpg',
            jobs: [
              'Chaser for the Holyhead Harpies (formerly)',
              'Senior Quidditch Correspondent for the Daily Prophet (formerly)',
              'Sports editor for the Daily Prophet',
            ],
            marital_status: 'Married',
            name: 'Ginevra Molly Potter (née Weasley)',
            nationality: 'English',
            patronus: 'Horse',
            romances: [
              'Dean Thomas (ex-boyfriend)',
              'Michael Corner (ex-boyfriend)',
              'Harry Potter (husband)',
            ],
            skin_color: null,
            species: 'Human',
            titles: ['Chaser', 'Seeker'],
            wands: ['Yew, unknown length, unknown core'],
            weight: null,
            wiki: 'https://harrypotter.fandom.com/wiki/Ginevra_Weasley',
          },
          links: {
            self: '/v1/characters/49ce06a5-f08b-4475-8e79-72a2b0733c5d',
          },
        },
      ])
    );
    const state = store.getState();

    expect(state.favorits.favorits).toEqual([
      {
        id: '643ae975-0c29-49a7-a87e-d052b798962d',
        type: 'character',
        attributes: {
          slug: 'george-weasley-s-dance-partner',
          alias_names: [],
          animagus: null,
          blood_status: null,
          boggart: null,
          born: 'Before 1994',
          died: null,
          eye_color: null,
          family_members: [],
          gender: 'Female',
          hair_color: 'Black',
          height: null,
          house: null,
          image: null,
          jobs: [],
          marital_status: null,
          name: "George Weasley's dance partner",
          nationality: null,
          patronus: null,
          romances: [],
          skin_color: 'Light',
          species: 'Human',
          titles: [],
          wands: [],
          weight: null,
          wiki: "https://harrypotter.fandom.com/wiki/George_Weasley's_dance_partner",
        },
        links: {
          self: '/v1/characters/643ae975-0c29-49a7-a87e-d052b798962d',
        },
      },
      {
        id: '49ce06a5-f08b-4475-8e79-72a2b0733c5d',
        type: 'character',
        attributes: {
          slug: 'ginevra-weasley',
          alias_names: [
            'Ginny (by family & friends)',
            'Gin (by Harry Potter)',
            'Skinny Ginny (by Ronald Weasley)',
          ],
          animagus: null,
          blood_status: 'Pure-blood',
          boggart: 'Lord Voldemort',
          born: '11 August 1981, Great Britain',
          died: null,
          eye_color: 'Bright brown',
          family_members: [
            'Arthur Weasley (father)',
            'Molly Weasley (née Prewett) (mother)',
            'William Weasley (older brother)',
            'Charles Weasley (older brother)',
            'Percy Weasley (older brother)',
            'Fred Weasley (older brother) †',
            'George Weasley (older brother)',
            'Ronald Weasley (older brother)',
            'Harry Potter (husband)',
            'James Potter (II) (son)',
            'Albus Potter (son)',
            'Lily Potter (II) (daughter)',
            'James Potter (I) (father-in-law) †',
            'Lily Potter (I) (née Evans) (mother-in-law) †',
            'Fleur Weasley (née Delacour) (sister-in-law)',
            'Audrey Weasley (sister-in-law)',
            'Angelina Weasley (née Johnson) (sister-in-law)',
            'Hermione Granger (sister-in-law)',
            'Padma Patil (sister-in-law in alternate timeline)',
            'Victoire Weasley (niece)',
            'Dominique Weasley (niece)',
            'Louis Weasley (nephew)',
            'Molly Weasley (II) (niece)',
            'Lucy Weasley (niece)',
            'Fred Weasley (II) (nephew)',
            'Roxanne Weasley (niece)',
            'Rose Granger-Weasley (niece)',
            'Hugo Granger-Weasley (nephew)',
            'Panju Weasley (nephew in alternate timeline)',
            'Two paternal uncles',
            'Fabian Prewett (maternal uncle) †',
            'Gideon Prewett (maternal uncle) †',
            'Bilius (uncle or uncle by marriage) †',
            'Uncle or uncle by marriage',
            'First cousin',
            'Septimus Weasley (paternal grandfather)',
            'Cedrella Weasley (née Black) (paternal grandmother)',
            'Maternal grandfather',
            'Matilda Weasley (possible relative)',
            'G. Weasley (possible relative)',
            'Garreth Weasley (possible relative)',
            'Possible relative',
            'Possible relatives',
            'Hector Weasley (possible relative)',
            'Weasley family (paternal family)',
            'Prewett family (maternal family)',
            'Potter family (in-laws/descendants)',
          ],
          gender: 'Female',
          hair_color: 'Red',
          height: null,
          house: 'Gryffindor',
          image:
            'https://static.wikia.nocookie.net/harrypotter/images/8/8b/Ginny_Weasley_hbp_promo.jpg',
          jobs: [
            'Chaser for the Holyhead Harpies (formerly)',
            'Senior Quidditch Correspondent for the Daily Prophet (formerly)',
            'Sports editor for the Daily Prophet',
          ],
          marital_status: 'Married',
          name: 'Ginevra Molly Potter (née Weasley)',
          nationality: 'English',
          patronus: 'Horse',
          romances: [
            'Dean Thomas (ex-boyfriend)',
            'Michael Corner (ex-boyfriend)',
            'Harry Potter (husband)',
          ],
          skin_color: null,
          species: 'Human',
          titles: ['Chaser', 'Seeker'],
          wands: ['Yew, unknown length, unknown core'],
          weight: null,
          wiki: 'https://harrypotter.fandom.com/wiki/Ginevra_Weasley',
        },
        links: {
          self: '/v1/characters/49ce06a5-f08b-4475-8e79-72a2b0733c5d',
        },
      },
    ]);
  });
});
