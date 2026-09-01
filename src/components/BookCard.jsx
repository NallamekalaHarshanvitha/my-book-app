import '../Styles/BookCard.css'

const BookCard = ({ id, title, author, coverImage }) => {
  const handleFavoriteClick = () => {
    console.log('Favorite book id:', id)
  }

  return (
    <li className="book-item">
      <img className="book-cover" src={coverImage} alt={`${title} cover`} />
      <div className="book-info">
        <h3>{title}</h3>
        <p>{author}</p>
      </div>
      <button type="button" className="favorite-button" onClick={handleFavoriteClick}>
        Favorite
      </button>
    </li>
  )
}

export default BookCard