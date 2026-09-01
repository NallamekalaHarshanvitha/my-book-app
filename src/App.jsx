import { useEffect, useState } from 'react'
import './App.css'
import BookList from './components/BookList'

const initialBooks = [
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

function App () {
  const [query, setQuery] = useState('')
  const [books, setBooks] = useState(initialBooks)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')

  const fetchBooks = async (searchQuery) => {
    try {
      setIsLoading(true)
      setError('')

      const response = await fetch('https://jsonplaceholder.typicode.com/users')

      if (!response.ok) {
        throw new Error('Failed to fetch books')
      }

      const data = await response.json()
      const normalizedQuery = searchQuery.trim().toLowerCase()

      const filteredBooks = initialBooks.filter((book) => {
        if (!normalizedQuery) return true

        return (
          book.title.toLowerCase().includes(normalizedQuery) ||
          book.author.toLowerCase().includes(normalizedQuery)
        )
      })
 
      const booksFromApi = data.slice(0, 6).map((item, index) => ({
        id: item.id || index + 1,
        title: item.name || initialBooks[index]?.title || 'Untitled Book',
        author: item.company?.name || initialBooks[index]?.author || 'Unknown Author',
        coverImage: initialBooks[index]?.coverImage || ''
      }))

      setBooks(normalizedQuery ? filteredBooks : booksFromApi.length ? booksFromApi : initialBooks)
    } catch(err) {
      setError('Something went wrong while searching books.')
      console.error(err)
      setBooks(initialBooks)
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    fetchBooks(query)
  }, [query])

  const handleSubmit = (event) => {
    event.preventDefault()
    fetchBooks(query)
  }

  return (
    <div className="app-container">
      <header className="app-header">
        <h1>My Book App</h1>
        <nav>
          <ul className="nav-list">
            <li><a href="/">Home</a></li>
            <li><a href="/about">About</a></li>
          </ul>
          <form className="search-form" onSubmit={handleSubmit}>
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search books..."
              aria-label="Search books"
            />
            <button type="submit" className="button" disabled={isLoading}>
              {isLoading ? 'Loading...' : 'Search'}
            </button>
          </form>
        </nav>
      </header>
      <main className="main-content">
        {isLoading && <div className="loading-state">Loading books...</div>}
        {!isLoading && error && <p className="error-message">{error}</p>}
        {!isLoading && !error && (
          <section className="book-section">
            <BookList books={books} />
          </section>
        )}
      </main>
    </div>
  )
}

export default App