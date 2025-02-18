import { describe, it, expect } from 'vitest';
import favoritsReducer, { setFavorites, clearFavorits } from './favoritsSlice';

describe('favoritsSlice', () => {
  it('должен вернуть начальное состояние', () => {
    const initialState = { favorits: [] };
    expect(favoritsReducer(undefined, { type: '' })).toEqual(initialState);
  });

  it('должен устанавливать избранные элементы', () => {
    const previousState = { favorits: [] };
    const newFavorites = ['Harry Potter', 'Hermione Granger'];

    const newState = favoritsReducer(previousState, setFavorites(newFavorites));

    expect(newState.favorits).toEqual(newFavorites);
  });

  it('должен очищать список избранных элементов', () => {
    const previousState = { favorits: ['Harry Potter', 'Hermione Granger'] };

    const newState = favoritsReducer(previousState, clearFavorits());

    expect(newState.favorits).toEqual([]);
  });
});
