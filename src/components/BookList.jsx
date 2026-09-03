import BookCard from './BookCard'
import '../Styles/Booklist.css'

const BookList = ({ books = [], favorites = [], onToggleFavorite = () => {} }) => {
  return (
    <ul className="book-list">
      {books.map((book) => {
        const isFavorite = favorites.some((favorite) => favorite.id === book.id)

        return (
          <BookCard
            key={book.id}
            id={book.id}
            title={book.title}
            author={book.author}
            coverImage={book.coverImage}
            isFavorite={isFavorite}
            onToggleFavorite={onToggleFavorite}
          />
        )
      })}
    </ul>
  )
}

export default BookList