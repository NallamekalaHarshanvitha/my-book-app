import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'

const coverImages = [
  'https://images.unsplash.com/photo-1543002588-bfa74002ed7e?auto=format&fit=crop&w=300&q=80',
  'https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?auto=format&fit=crop&w=300&q=80',
  'https://images.unsplash.com/photo-1512820790803-83ca734da794?auto=format&fit=crop&w=300&q=80',
  'https://images.unsplash.com/photo-1516979187457-637abb4f9353?auto=format&fit=crop&w=300&q=80',
  'https://images.unsplash.com/photo-1519682337058-a94d519337bc?auto=format&fit=crop&w=300&q=80'
]

export const fetchBookDetails = createAsyncThunk(
  'bookDetails/fetchBookDetails',
  async (id, { signal, rejectWithValue }) => {
    try {
      const response = await fetch(`https://jsonplaceholder.typicode.com/users/${id}`, { signal })

      if (!response.ok) {
        return rejectWithValue('Book not found.')
      }

      const data = await response.json()
      return {
        id: data.id,
        title: data.name,
        author: data.company?.name || 'Unknown Author',
        coverImage: coverImages[(Number(data.id) - 1) % coverImages.length]
      }
    } catch (error) {
      if (error.name === 'AbortError') {
        throw error
      }

      return rejectWithValue('Something went wrong while loading this book.')
    }
  }
)

const bookDetailsSlice = createSlice({
  name: 'bookDetails',
  initialState: {
    book: null,
    isLoading: false,
    error: ''
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchBookDetails.pending, (state) => {
        state.book = null
        state.isLoading = true
        state.error = ''
      })
      .addCase(fetchBookDetails.fulfilled, (state, action) => {
        state.book = action.payload
        state.isLoading = false
      })
      .addCase(fetchBookDetails.rejected, (state, action) => {
        state.isLoading = false
        if (!action.meta.aborted) {
          state.book = null
          state.error = action.payload || 'Something went wrong while loading this book.'
        }
      })
  }
})

export default bookDetailsSlice.reducer