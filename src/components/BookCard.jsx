const BookCard = ({ title, author, coverImage }) => {
  return (
    <li className="book-item">
      <img className="book-cover" src={coverImage} alt={`${title} cover`} />
      <div className="book-info">
        <h3>{title}</h3>
        <p>{author}</p>
      </div>
    </li>
  )
}

export default BookCard