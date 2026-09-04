import { act, renderHook } from '@testing-library/react'
import useBookSearch from './useBookSearch'

describe('useBookSearch', () => {
  beforeEach(() => {
    jest.useFakeTimers()
    globalThis.fetch = jest.fn()
  })

  afterEach(() => {
    jest.runOnlyPendingTimers()
    jest.useRealTimers()
    delete globalThis.fetch
  })

  it('transitions from loading to success when the request succeeds', async () => {
    const books = [{ id: 1, name: 'React Book', company: { name: 'Test Author' } }]
    globalThis.fetch.mockResolvedValue({
      ok: true,
      json: async () => books
    })

    const { result } = renderHook(() => useBookSearch('React'))

    expect(result.current.isLoading).toBe(false)

    act(() => {
      jest.advanceTimersByTime(400)
    })

    expect(result.current.isLoading).toBe(true)

    await act(async () => {
      await Promise.resolve()
      await Promise.resolve()
    })

    expect(result.current.isLoading).toBe(false)
    expect(result.current.error).toBe('')
    expect(result.current.books.some((book) => book.title === 'React Book')).toBe(true)
    expect(globalThis.fetch).toHaveBeenCalledWith(
      'https://jsonplaceholder.typicode.com/users',
      expect.objectContaining({ signal: expect.any(AbortSignal) })
    )
  })

  it('transitions from loading to error when the request fails', async () => {
    globalThis.fetch.mockRejectedValue(new Error('Network error'))

    const { result } = renderHook(() => useBookSearch('React'))

    act(() => {
      jest.advanceTimersByTime(400)
    })

    expect(result.current.isLoading).toBe(true)

    await act(async () => {
      await Promise.resolve()
      await Promise.resolve()
    })

    expect(result.current.isLoading).toBe(false)
    expect(result.current.error).toBe('Something went wrong while searching books.')
  })
})
