import { configureStore } from '@reduxjs/toolkit';
import axios from 'axios';
import characters, { fetchItems, setChracters } from './chractersSlice';

export const store = configureStore({
  reducer: {
    characters: characters,
  },
});

type AppStore = typeof store;

vi.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;

describe('charactersSlice', () => {
  let store: AppStore;

  beforeEach(() => {
    store = configureStore({ reducer: { characters: characters } });
  });

  it('should return the initial state', () => {
    const initialState = store.getState().characters;
    expect(initialState).toEqual({
      response: {
        data: [],
        meta: {
          copyright: '',
          generated_at: '',
        },
        links: {
          self: '',
        },
      },
      status: 'loading',
    });
  });

  it('should handle setChracters', () => {
    const mockPayload = {
      data: [{ id: 1, name: 'Harry Potter' }],
      meta: {
        copyright: 'Some copyright',
        generated_at: '2022-02-18T00:00:00Z',
      },
      links: {
        self: 'http://example.com',
      },
    };

    store.dispatch(setChracters(mockPayload));

    const state = store.getState().characters;
    expect(state.response).toEqual(mockPayload);
  });

  it('should handle fetchItems pending', async () => {
    const action = fetchItems.pending.type;

    store.dispatch({ type: action });

    const state = store.getState().characters;
    expect(state.status).toBe('loading');
  });

  it('should handle fetchItems fulfilled', async () => {
    const params = { searchParams: 'Harry', page: 1 };
    const mockResponse = {
      data: [{ id: 1, name: 'Harry Potter' }],
      meta: {
        copyright: 'Some copyright',
        generated_at: '2022-02-18T00:00:00Z',
      },
      links: {
        self: 'http://example.com',
      },
    };

    mockedAxios.get.mockResolvedValueOnce({ data: mockResponse });

    const result = await store.dispatch(fetchItems(params));
    const state = store.getState().characters;

    expect(result.type).toBe(fetchItems.fulfilled.type);
    expect(state.status).toBe('success');
    expect(state.response).toEqual(mockResponse);
  });

  it('should handle fetchItems rejected', async () => {
    const params = { searchParams: 'Harry', page: 1 };

    mockedAxios.get.mockRejectedValueOnce(new Error('Error fetching data'));

    await store.dispatch(fetchItems(params));
    const state = store.getState().characters;

    expect(state.status).toBe('error');
  });
});
