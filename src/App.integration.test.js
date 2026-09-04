import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { Provider } from 'react-redux'
import App from './App'
import store from './store/store'

describe('book search flow', () => {
  afterEach(() => {
    delete globalThis.fetch
  })

  it('shows cards returned by the API after searching', async () => {
    globalThis.fetch = jest.fn().mockResolvedValue({
      ok: true,
      json: async () => [
        { id: 1, name: 'React Testing', company: { name: 'Test Author' } }
      ]
    })
    const user = userEvent.setup()

    render(
      <Provider store={store}>
        <App />
      </Provider>
    )

    await user.type(screen.getByTestId('search-input'), 'React Testing')
    await screen.findByText('React Testing')
    const bookCards = await screen.findAllByTestId('favorite-button')

    expect(bookCards).toHaveLength(1)
    expect(globalThis.fetch).toHaveBeenCalledWith(
      'https://jsonplaceholder.typicode.com/users',
      expect.objectContaining({ signal: expect.any(AbortSignal) })
    )
  })

  it('shows an error when the search API fails', async () => {
    globalThis.fetch = jest.fn().mockRejectedValue(new Error('Network error'))
    jest.spyOn(console, 'error').mockImplementation(() => {})
    const user = userEvent.setup()

    render(
      <Provider store={store}>
        <App />
      </Provider>
    )

    await user.type(screen.getByTestId('search-input'), 'Missing book')

    expect(await screen.findByText('Something went wrong while searching books.')).toBeInTheDocument()
    console.error.mockRestore()
  })
})
