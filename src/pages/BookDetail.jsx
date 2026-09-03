import { useEffect } from 'react'
import { Link, useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { addFavorite, removeFavorite } from '../store/favoritesSlice'
import { fetchBookDetails } from '../store/bookDetailsSlice'

function BookDetail () {
  const { id } = useParams()
  const favorites = useSelector((state) => state.favorites)
  const { book, isLoading, error } = useSelector((state) => state.bookDetails)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(fetchBookDetails(id))
  }, [dispatch, id])

  const handleToggleFavorite = () => {
    if (!book) return

    const isFavorite = favorites.some((favorite) => favorite.id === book.id)
    dispatch(isFavorite ? removeFavorite(book) : addFavorite(book))
  }

  if (isLoading) return <div className="loading-state">Loading book...</div>
  if (error) return <p className="error-message">{error}</p>
  if (!book) return <p className="error-message">Book not found.</p>

  const isFavorite = favorites.some((favorite) => favorite.id === book.id)

  return (
    <article className="book-detail">
      <img className="book-detail-cover" src={book.coverImage} alt={`${book.title} cover`} />
      <div>
        <p><Link to="/">Back to books</Link></p>
        <h2>{book.title}</h2>
        <p>{book.author}</p>
        <button type="button" className="button" onClick={handleToggleFavorite}>
          {isFavorite ? 'Remove from favorites' : 'Add to favorites'}
        </button>
      </div>
    </article>
  )
}

export default BookDetail