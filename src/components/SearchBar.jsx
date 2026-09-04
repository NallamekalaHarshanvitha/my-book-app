function SearchBar ({ query, isLoading, searchInputRef, onQueryChange, onSubmit }) {
  return (
    <form className="search-form" onSubmit={onSubmit} data-testid="search-form">
      <input
        ref={searchInputRef}
        type="text"
        data-testid="search-input"
        value={query}
        onChange={(event) => onQueryChange(event.target.value)}
        placeholder="Search books..."
        aria-label="Search books"
      />
      <button type="submit" className="button" data-testid="search-button" disabled={isLoading}>
        {isLoading ? 'Loading...' : 'Search'}
      </button>
    </form>
  )
}

export default SearchBar
