import reducer, { addFavorite, clearFavorites, removeFavorite } from './favoritesSlice'

describe('favoritesReducer', () => {
  const firstBook = { id: 1, title: 'First Book' }
  const secondBook = { id: 2, title: 'Second Book' }

  it('adds a favorite without mutating the previous state', () => {
    const previousState = [firstBook]
    const nextState = reducer(previousState, addFavorite(secondBook))

    expect(nextState).toEqual([firstBook, secondBook])
    expect(nextState).not.toBe(previousState)
    expect(previousState).toEqual([firstBook])
  })

  it('does not add a duplicate favorite', () => {
    const previousState = [firstBook]
    const nextState = reducer(previousState, addFavorite({ ...firstBook, title: 'Updated Title' }))

    expect(nextState).toEqual([firstBook])
    expect(nextState).toBe(previousState)
    expect(previousState).toEqual([firstBook])
  })

  it('removes a favorite without mutating the previous state', () => {
    const previousState = [firstBook, secondBook]
    const nextState = reducer(previousState, removeFavorite(firstBook))

    expect(nextState).toEqual([secondBook])
    expect(nextState).not.toBe(previousState)
    expect(previousState).toEqual([firstBook, secondBook])
  })

  it('clears favorites without mutating the previous state', () => {
    const previousState = [firstBook, secondBook]
    const nextState = reducer(previousState, clearFavorites())

    expect(nextState).toEqual([])
    expect(nextState).not.toBe(previousState)
    expect(previousState).toEqual([firstBook, secondBook])
  })
})
