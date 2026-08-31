import './App.css'
import BookList from './components/BookList'

function App () {
  return (
    <div className="app-container">
      <header className="app-header">
        <h1>My Book App</h1>
        <nav>
          <ul className="nav-list">
            <li><a href="/">Home</a></li><br />
            <li><a href="/about">About</a></li><br />
          </ul>
          <form className="search-form" onSubmit={(e) => e.preventDefault()}>
            <input
              type="text"
              placeholder="Search books..."
              aria-label="Search books"
            />
            <button type="submit" className="button">
              Search
            </button>
          </form>
        </nav>
      </header>
      <main className="main-content">
        <section className="book-section">
          
          
          <BookList />
        </section>
      </main>
    </div>
  )
}

export default App