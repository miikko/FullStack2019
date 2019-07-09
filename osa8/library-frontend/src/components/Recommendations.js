import React, { useState, useEffect } from "react"
import BookTable from "./BookTable"

const Recommendations = ({ show, result }) => {
  const [genre, setGenre] = useState("")

  useEffect(() => {
    if (!result.loading && result.data.me) {
      setGenre(result.data.me.favoriteGenre)
    }
  }, [result])

  if (!show) {
    return null
  } else if (result.loading) {
    return <div>loading...</div>
  }

  return (
    <div>
      <h2>recommendations</h2>
      <p>books in your favorite genre
        <span style={{ fontWeight: "bold" }}>{" ".concat(genre)}</span>
      </p>
      <BookTable genre={genre} />
    </div>
  )
}

export default Recommendations