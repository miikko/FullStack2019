import React, { useState, useEffect } from 'react'
import BookTable from "./BookTable"

const Books = ({ show, result }) => {
  const [genres, setGenres] = useState([])
  const [genre, setGenre] = useState(null)

  useEffect(() => {
    if (!result.loading) {
      const books = result.data.allBooks
      const newGenres = []
      books.forEach(book => {
        book.genres.forEach(genre => {
          if (!newGenres.includes(genre)) {
            newGenres.push(genre)
          }
        })
      })
      setGenres(newGenres)
    }
  }, [result])

  if (!show) {
    return null
  } else if (result.loading) {
    return <div>loading...</div>
  }

  return (
    <div>
      <h2>books</h2>
      <p>in genre
        <span style={{ fontWeight: "bold" }}>
          {genre === null ? " all genres" : " ".concat(genre)}
        </span>
      </p>
      <BookTable genre={genre} />
      {genres.map(genre =>
        <button key={genre} onClick={() => setGenre(genre)}>
          {genre}
        </button>
      )}
      <button onClick={() => setGenre(null)}>all genres</button>
    </div>
  )
}

export default Books