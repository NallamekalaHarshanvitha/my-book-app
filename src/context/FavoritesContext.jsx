import { createContext, useReducer } from 'react'
import {
  favoritesReducer,
  initialFavorites
} from '../reducers/favoritesReducer'

const FavoritesContext = createContext(null)

export function FavoritesProvider ({ children }) {
  const [favorites, dispatch] = useReducer(favoritesReducer, initialFavorites)

  return (
    <FavoritesContext.Provider value={{ favorites, dispatch }}>
      {children}
    </FavoritesContext.Provider>
  )
}

export default FavoritesContext
