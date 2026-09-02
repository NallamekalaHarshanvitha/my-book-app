export const FAVORITES_ACTION_TYPES = {
  ADD_FAVORITE: 'ADD_FAVORITE',
  REMOVE_FAVORITE: 'REMOVE_FAVORITE',
  CLEAR_FAVORITES: 'CLEAR_FAVORITES'
}

export const initialFavorites = []

export function favoritesReducer (state, action) {
  switch (action.type) {
    case FAVORITES_ACTION_TYPES.ADD_FAVORITE: {
      const isAlreadyFavorite = state.some((book) => book.id === action.payload.id)
      if (isAlreadyFavorite) {
        return state
      }

      return [...state, action.payload]
    }

    case FAVORITES_ACTION_TYPES.REMOVE_FAVORITE:
      return state.filter((book) => book.id !== action.payload.id)

    case FAVORITES_ACTION_TYPES.CLEAR_FAVORITES:
      return []

    default:
      return state
  }
}
