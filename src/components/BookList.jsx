import BookCard from './BookCard'
import '../Styles/Booklist.css'

const BookList = ({ books = [] }) => {
  return (
    <ul className="book-list">
      {books.map((book) => (
        <BookCard
          key={book.id}
          id={book.id}
          title={book.title}
          author={book.author}
          coverImage={book.coverImage}
        />
      ))}
    </ul>
  )
}

export default BookList