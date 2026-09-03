import { useEffect, useState } from 'react'

const initialBooks = [
  {
    id: 7,
    title: 'The Hobbit',
    author: 'J.R.R. Tolkien',
    coverImage: 'https://images.unsplash.com/photo-1543002588-bfa74002ed7e?auto=format&fit=crop&w=300&q=80'
  },
  {
    id: 8,
    title: '1984',
    author: 'George Orwell',
    coverImage: 'https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?auto=format&fit=crop&w=300&q=80'
  },
  {
    id: 9,
    title: 'To Kill a Mockingbird',
    author: 'Harper Lee',
    coverImage: 'https://images.unsplash.com/photo-1512820790803-83ca734da794?auto=format&fit=crop&w=300&q=80'
  },
  {
    id: 10,
    title: 'Pride and Prejudice',
    author: 'Jane Austen',
    coverImage: 'https://images.unsplash.com/photo-1516979187457-637abb4f9353?auto=format&fit=crop&w=300&q=80'
  },
  {
    id: 11,
    title: 'The Great Gatsby',
    author: 'F. Scott Fitzgerald',
    coverImage: 'https://images.unsplash.com/photo-1519682337058-a94d519337bc?auto=format&fit=crop&w=300&q=80'
  },
  {
    id: 12,
    title: 'The Alchemist',
    author: 'Paulo Coelho',
    coverImage: 'https://images.unsplash.com/photo-1516979187457-637abb4f9353?auto=format&fit=crop&w=300&q=80'
  }
]

export function useBookSearch (query) {
  const [books, setBooks] = useState(initialBooks)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')

  useEffect(() => {
    const controller = new AbortController()

    const fetchBooks = async (searchQuery) => {
      try {
        setIsLoading(true)
        setError('')

        const response = await fetch('https://jsonplaceholder.typicode.com/users', {
          signal: controller.signal
        })

        if (!response.ok) {
          throw new Error('Failed to fetch books')
        }

        const data = await response.json()
        const normalizedQuery = searchQuery.trim().toLowerCase()

        const booksFromApi = data.slice(0, 6).map((item, index) => ({
          id: item.id || index + 1,
          title: item.name || initialBooks[index]?.title || 'Untitled Book',
          author: item.company?.name || initialBooks[index]?.author || 'Unknown Author',
          coverImage: initialBooks[index]?.coverImage || ''
        }))

        const combinedBooks = [...initialBooks, ...booksFromApi]
        const uniqueBooks = Array.from(
          new Map(combinedBooks.map((book) => [book.id, book])).values()
        )

        const visibleBooks = normalizedQuery
          ? uniqueBooks.filter((book) => {
              return (
                book.title.toLowerCase().includes(normalizedQuery) ||
                book.author.toLowerCase().includes(normalizedQuery)
              )
            })
          : uniqueBooks

        if (!controller.signal.aborted) {
          setBooks(visibleBooks)
        }
      } catch (err) {
        if (err.name !== 'AbortError' && !controller.signal.aborted) {
          setError('Something went wrong while searching books.')
          console.error(err)
          setBooks(initialBooks)
        }
      } finally {
        if (!controller.signal.aborted) {
          setIsLoading(false)
        }
      }
    }

    const timer = setTimeout(() => {
      if (query.trim()) {
        fetchBooks(query)
      } else if (!controller.signal.aborted) {
        setBooks(initialBooks)
      }
    }, 400)

    return () => {
      clearTimeout(timer)
      controller.abort()
    }
  }, [query])

  return { books, isLoading, error }
}

export default useBookSearch