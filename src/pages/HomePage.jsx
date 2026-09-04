import BookList from '../components/BookList'

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

export default HomePage
