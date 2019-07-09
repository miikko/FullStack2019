import React, { useState, useEffect } from "react"
import { useApolloClient } from '@apollo/react-hooks'
import { gql } from "apollo-boost"

const BOOKS_IN_GENRE = gql`
query booksInGenre($genre: String) {
  allBooks(genre: $genre) {
    title
    genres
    author {
      name
    }
    published
  }
}
`

const BookTable = ({ genre }) => {
  const [books, setBooks] = useState([])
  const client = useApolloClient()
  
  useEffect(() => {
    updateBooks()
  }, [genre])

  const updateBooks = async () => {
    if (genre !== undefined) {
      const { data } = await client.query({
        query: BOOKS_IN_GENRE,
        variables: { genre },
        fetchPolicy: "no-cache"
      })
      setBooks(data.allBooks)
    }
  }

  return (
    <table>
      <tbody>
        <tr>
          <th></th>
          <th>
            author
            </th>
          <th>
            published
            </th>
        </tr>
        {books.map(a =>
          <tr key={a.title}>
            <td>{a.title}</td>
            <td>{a.author.name}</td>
            <td>{a.published}</td>
          </tr>
        )}
      </tbody>
    </table>
  )
}

export default BookTable