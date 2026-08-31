import BookCard from './BookCard'

const books = [
  {
    id: 1,
    title: 'The Hobbit',
    author: 'J.R.R. Tolkien',
    coverImage: 'https://images.unsplash.com/photo-1543002588-bfa74002ed7e?auto=format&fit=crop&w=300&q=80'
  },
  {
    id: 2,
    title: '1984',
    author: 'George Orwell',
    coverImage: 'https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?auto=format&fit=crop&w=300&q=80'
  },
  {
    id: 3,
    title: 'To Kill a Mockingbird',
    author: 'Harper Lee',
    coverImage: 'https://images.unsplash.com/photo-1512820790803-83ca734da794?auto=format&fit=crop&w=300&q=80'
  },
  {
    id: 4,
    title: 'Pride and Prejudice',
    author: 'Jane Austen',
    coverImage: 'https://images.unsplash.com/photo-1516979187457-637abb4f9353?auto=format&fit=crop&w=300&q=80'
  },
  {
    id: 5,
    title: 'The Great Gatsby',
    author: 'F. Scott Fitzgerald',
    coverImage: 'https://images.unsplash.com/photo-1519682337058-a94d519337bc?auto=format&fit=crop&w=300&q=80'
  },
  {
    id: 6,
    title: 'The Alchemist',
    author: 'Paulo Coelho',
    coverImage: 'https://images.unsplash.com/photo-1516979187457-637abb4f9353?auto=format&fit=crop&w=300&q=80'
  }
]

const BookList = () => {
  return (
    <ul className="book-list">
      {books.map((book) => (
        <BookCard
          key={book.id}
          title={book.title}
          author={book.author}
          coverImage={book.coverImage}
        />
      ))}
    </ul>
  )
}

export default BookList