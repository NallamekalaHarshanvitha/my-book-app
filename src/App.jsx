import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { BrowserRouter, Link, Route, Routes } from 'react-router-dom'
import './App.css'
import BookList from './components/BookList'
import { useBookSearch } from './hooks/useBookSearch'
import BookDetail from './pages/BookDetail'
import { useDispatch, useSelector } from 'react-redux'
import { addFavorite, removeFavorite } from './store/favoritesSlice'

function Header ({ favoritesCount, query, isLoading, searchInputRef, onQueryChange, onSubmit }) {
  return (
    <header className="app-header">
      <h1>My Book App</h1>
      <nav>
        <ul className="nav-list">
          <li><Link to="/">Home</Link></li>
          <li>
            <Link to="/favorites" className="favorites-pill" aria-label="Favorites count">
              Favorites <span className="favorites-badge">{favoritesCount}</span>
            </Link>
          </li>
        </ul>
        <form className="search-form" onSubmit={onSubmit}>
          <input
            ref={searchInputRef}
            type="text"
            value={query}
            onChange={(event) => onQueryChange(event.target.value)}
            placeholder="Search books..."
            aria-label="Search books"
          />
          <button type="submit" className="button" disabled={isLoading}>
            {isLoading ? 'Loading...' : 'Search'}
          </button>
        </form>
      </nav>
    </header>
  )
}

function HomePage ({ books, favorites, isLoading, error, onToggleFavorite }) {
  return (
    <>
      {favorites.length > 0 && (
        <div className="favorites-summary">
          <strong>Favorites:</strong> {favorites.length}
        </div>
      )}
      {isLoading && <div className="loading-state">Loading books...</div>}
      {!isLoading && error && <p className="error-message">{error}</p>}
      {!isLoading && !error && (
        <section className="book-section">
          <BookList books={books} favorites={favorites} onToggleFavorite={onToggleFavorite} />
        </section>
      )}
    </>
  )
}

function FavoritesPage ({ favorites, onToggleFavorite }) {
  return (
    <section className="book-section">
      <h2>Favorites</h2>
      {favorites.length > 0
        ? <BookList books={favorites} favorites={favorites} onToggleFavorite={onToggleFavorite} />
        : <p>No favorite books yet.</p>}
    </section>
  )
}

function AppContent () {
  const [query, setQuery] = useState('')
  const favorites = useSelector((state) => state.favorites)
  const favoritesCount = useMemo(() => favorites.length, [favorites])
  const dispatch = useDispatch()
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

  const handleToggleFavorite = useCallback((book) => {
    const isFavorite = favorites.some((favorite) => favorite.id === book.id)

    dispatch(isFavorite ? removeFavorite(book) : addFavorite(book))
  }, [dispatch, favorites])

  return (
    <div className="app-container">
      <Header
        favoritesCount={favoritesCount}
        query={query}
        isLoading={isLoading}
        searchInputRef={searchInputRef}
        onQueryChange={setQuery}
        onSubmit={handleSubmit}
      />
      <main className="main-content">
        <Routes>
          <Route path="/" element={<HomePage books={books} favorites={favorites} isLoading={isLoading} error={error} onToggleFavorite={handleToggleFavorite} />} />
          <Route path="/favorites" element={<FavoritesPage favorites={favorites} onToggleFavorite={handleToggleFavorite} />} />
          <Route path="/book/:id" element={<BookDetail />} />
        </Routes>
      </main>
    </div>
  )
}

function App () {
  return (
    <BrowserRouter>
      <AppContent />
    </BrowserRouter>
  )
}

export default App