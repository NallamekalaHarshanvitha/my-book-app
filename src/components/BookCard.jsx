import { Link } from 'react-router-dom'
import '../Styles/BookCard.css'
import { memo } from 'react'

const BookCard = memo(function BookCard ({ id, title, author, coverImage, isFavorite = false, onToggleFavorite }) {
  const handleFavoriteClick = () => {
    onToggleFavorite?.({ id, title, author, coverImage })
  }

  return (
    <li className="book-item">
      <Link to={`/book/${id}`} data-testid="book-cover-link">
        <img className="book-cover" src={coverImage} alt={`${title} cover`} />
      </Link>
      <div className="book-info">
        <h3><Link to={`/book/${id}`} data-testid="book-title-link">{title}</Link></h3>
        <p>{author}</p>
      </div>
      <button
        type="button"
        className={`favorite-button ${isFavorite ? 'favorite-button-active' : ''}`}
        data-testid="favorite-button"
        onClick={handleFavoriteClick}
      >
        {isFavorite ? 'Favorited' : 'Favorite'}
      </button>
    </li>
  )
})

export default BookCard