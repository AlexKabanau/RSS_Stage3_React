import { describe, it, expect } from 'vitest';
import favoritsReducer, { setFavorites, clearFavorits } from './favoritsSlice';
import { firstCharacter, secondCharacter } from '../../mock/mock';

describe('favoritsSlice', () => {
  it('должен вернуть начальное состояние', () => {
    const initialState = { favorits: [] };
    expect(favoritsReducer(undefined, { type: '' })).toEqual(initialState);
  });

  it('должен устанавливать избранные элементы', () => {
    const previousState = { favorits: [] };
    const newFavorites = [firstCharacter, secondCharacter];

    const newState = favoritsReducer(previousState, setFavorites(newFavorites));

    expect(newState.favorits).toEqual(newFavorites);
  });

  it('должен очищать список избранных элементов', () => {
    const previousState = { favorits: [firstCharacter, secondCharacter] };

    const newState = favoritsReducer(previousState, clearFavorits());

    expect(newState.favorits).toEqual([]);
  });
});
