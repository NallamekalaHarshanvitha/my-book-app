import { fireEvent, render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import BookCard from './BookCard'

describe('BookCard', () => {
  const book = {
    id: 42,
    title: 'The Test Book',
    author: 'Test Author',
    coverImage: 'https://example.com/test-book.jpg'
  }

  it('renders the title and author from props', () => {
    render(
      <MemoryRouter>
        <BookCard {...book} />
      </MemoryRouter>
    )

    expect(screen.getByText(book.title)).toBeInTheDocument()
    expect(screen.getByText(book.author)).toBeInTheDocument()
  })

  it('calls onToggleFavorite with the correct book id when clicked', () => {
    const onToggleFavorite = jest.fn()

    render(
      <MemoryRouter>
        <BookCard {...book} onToggleFavorite={onToggleFavorite} />
      </MemoryRouter>
    )

    fireEvent.click(screen.getByTestId('favorite-button'))

    expect(onToggleFavorite).toHaveBeenCalledTimes(1)
    expect(onToggleFavorite).toHaveBeenCalledWith(expect.objectContaining({ id: book.id }))
  })
})
