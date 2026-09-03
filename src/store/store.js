import { configureStore } from '@reduxjs/toolkit'
import favoritesReducer from './favoritesSlice'
import bookDetailsReducer from './bookDetailsSlice'

export const store = configureStore({
  reducer: {
    favorites: favoritesReducer,
    bookDetails: bookDetailsReducer
  }
})

export default store