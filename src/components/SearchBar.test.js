import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { useState } from 'react'
import SearchBar from './SearchBar'

function ControlledSearchBar ({ onSearch, onSubmit }) {
  const [query, setQuery] = useState('')

  return (
    <SearchBar
      query={query}
      isLoading={false}
      onQueryChange={(value) => {
        setQuery(value)
        onSearch(value)
      }}
      onSubmit={onSubmit}
    />
  )
}

describe('SearchBar', () => {
  it('updates its value and calls onSearch when the user types', async () => {
    const user = userEvent.setup()
    const onSearch = jest.fn()

    render(<ControlledSearchBar onSearch={onSearch} onSubmit={jest.fn()} />)

    const input = screen.getByTestId('search-input')
    await user.type(input, 'React testing')

    expect(input).toHaveValue('React testing')
    expect(onSearch).toHaveBeenLastCalledWith('React testing')
  })

  it('calls onSubmit and prevents the default page reload on submit', async () => {
    const user = userEvent.setup()
    const onSubmit = jest.fn((event) => event.preventDefault())

    render(<ControlledSearchBar onSearch={jest.fn()} onSubmit={onSubmit} />)

    await user.click(screen.getByTestId('search-button'))

    expect(onSubmit).toHaveBeenCalledTimes(1)
    expect(onSubmit.mock.calls[0][0].defaultPrevented).toBe(true)
  })
})
