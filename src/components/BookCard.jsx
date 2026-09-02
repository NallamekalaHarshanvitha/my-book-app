import '../Styles/BookCard.css'

const BookCard = ({ id, title, author, coverImage, isFavorite = false, onToggleFavorite }) => {
  const handleFavoriteClick = () => {
    onToggleFavorite?.({ id, title, author, coverImage })
  }

  return (
    <li className="book-item">
      <img className="book-cover" src={coverImage} alt={`${title} cover`} />
      <div className="book-info">
        <h3>{title}</h3>
        <p>{author}</p>
      </div>
      <button
        type="button"
        className={`favorite-button ${isFavorite ? 'favorite-button-active' : ''}`}
        onClick={handleFavoriteClick}
      >
        {isFavorite ? 'Favorited' : 'Favorite'}
      </button>
    </li>
  )
}

export default BookCard