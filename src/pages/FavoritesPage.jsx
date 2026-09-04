import BookList from '../components/BookList'

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

export default FavoritesPage
