import { createSlice } from '@reduxjs/toolkit'

const initialState = []

const favoritesSlice = createSlice({
  name: 'favorites',
  initialState,
  reducers: {
    addFavorite: (state, action) => {
      const isAlreadyFavorite = state.some((book) => book.id === action.payload.id)
      if (!isAlreadyFavorite) {
        state.push(action.payload)
      }
    },
    removeFavorite: (state, action) => {
      const favoriteIndex = state.findIndex((book) => book.id === action.payload.id)
      if (favoriteIndex !== -1) {
        state.splice(favoriteIndex, 1)
      }
    },
    clearFavorites: (state) => {
      state.splice(0, state.length)
    }
  }
})

export const { addFavorite, removeFavorite, clearFavorites } = favoritesSlice.actions
export default favoritesSlice.reducer