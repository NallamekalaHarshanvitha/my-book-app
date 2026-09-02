import { useEffect, useRef, useState } from 'react'
import './App.css'
import BookList from './components/BookList'
import { useBookSearch } from './hooks/useBookSearch'
import { FavoritesProvider } from './context/FavoritesContext'
import { useFavorites } from './context/useFavorites'
import { FAVORITES_ACTION_TYPES } from './reducers/favoritesReducer'

function AppContent () {
  const [query, setQuery] = useState('')
  const { favorites, dispatch } = useFavorites()
  const { books, isLoading, error } = useBookSearch(query)
  const searchInputRef = useRef(null)

  useEffect(() => {
    searchInputRef.current?.focus()
  }, [])

  const handleSubmit = (event) => {
    event.preventDefault()
    if (query.trim()) {
      setQuery(query)
    }
  }

  const handleToggleFavorite = (book) => {
    const isFavorite = favorites.some((favorite) => favorite.id === book.id)

    dispatch({
      type: isFavorite ? FAVORITES_ACTION_TYPES.REMOVE_FAVORITE : FAVORITES_ACTION_TYPES.ADD_FAVORITE,
      payload: book
    })
  }

  return (
    <div className="app-container">
      <header className="app-header">
        <h1>My Book App</h1>
        <nav>
          <ul className="nav-list">
            <li><a href="/">Home</a></li>
            <li><a href="/about">About</a></li>
            <li className="favorites-pill" aria-label="Favorites count">
              Favorites <span className="favorites-badge">{favorites.length}</span>
            </li>
          </ul>
          <form className="search-form" onSubmit={handleSubmit}>
            <input
              ref={searchInputRef}
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search books..."
              aria-label="Search books"
            />
            <button type="submit" className="button" disabled={isLoading}>
              {isLoading ? 'Loading...' : 'Search'}
            </button>
          </form>
        </nav>
      </header>
      <main className="main-content">
        {favorites.length > 0 && (
          <div className="favorites-summary">
            <strong>Favorites:</strong> {favorites.length}
          </div>
        )}
        {isLoading && <div className="loading-state">Loading books...</div>}
        {!isLoading && error && <p className="error-message">{error}</p>}
        {!isLoading && !error && (
          <section className="book-section">
            <BookList
              books={books}
              favorites={favorites}
              onToggleFavorite={handleToggleFavorite}
            />
          </section>
        )}
      </main>
    </div>
  )
}

function App () {
  return (
    <FavoritesProvider>
      <AppContent />
    </FavoritesProvider>
  )
}

export default App