import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { BrowserRouter, Link, Route, Routes } from 'react-router-dom'
import './App.css'
import SearchBar from './components/SearchBar'
import { useBookSearch } from './hooks/useBookSearch'
import BookDetail from './pages/BookDetail'
import FavoritesPage from './pages/FavoritesPage'
import HomePage from './pages/HomePage'
import { useDispatch, useSelector } from 'react-redux'
import { addFavorite, removeFavorite } from './store/favoritesSlice'

function Header ({ favoritesCount, query, isLoading, searchInputRef, onQueryChange, onSubmit }) {
  return (
    <header className="app-header">
      <h1>My Book App</h1>
      <nav>
        <ul className="nav-list">
          <li><Link to="/" data-testid="home-link">Home</Link></li>
          <li>
            <Link to="/favorites" className="favorites-pill" aria-label="Favorites count" data-testid="favorites-link">
              Favorites <span className="favorites-badge" data-testid="favorites-badge">{favoritesCount}</span>
            </Link>
          </li>
        </ul>
        <SearchBar
          query={query}
          isLoading={isLoading}
          searchInputRef={searchInputRef}
          onQueryChange={onQueryChange}
          onSubmit={onSubmit}
        />
      </nav>
    </header>
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