import React, { useState, useEffect } from 'react'
import Authors from './components/Authors'
import Books from './components/Books'
import NewBook from './components/NewBook'
import LoginForm from "./components/LoginForm"
import Recommendations from "./components/Recommendations"
import { gql } from "apollo-boost"
import { useQuery, useMutation, useSubscription, useApolloClient } from "@apollo/react-hooks"

const BOOK_DETAILS = gql`
fragment BookDetails on Book {
  title
  genres
  author {
    name
    born
    bookCount
  }
  published
}
`

const ALL_AUTHORS = gql`
{
  allAuthors {
    name
    born
    bookCount
  }
}
`
const LOGIN = gql`
mutation login($username: String!, $password: String!) {
  login(username: $username, password: $password) {
    value
  }
}
`

const ALL_BOOKS = gql`
{
  allBooks {
    ...BookDetails
  }
}
${BOOK_DETAILS}
`

const ADD_BOOK = gql`
mutation addBook($title: String!,
  $author: String!, $published: Int!, $genres: [String!]!) {
    addBook(
      title: $title,
      author: $author,
      published: $published,
      genres: $genres
    ) {
    ...BookDetails
    }
}
${BOOK_DETAILS}
`

const EDIT_AUTHOR = gql`
mutation editAuthor($name: String!, $setBornTo: Int!) {
  editAuthor(
    name: $name,
    setBornTo: $setBornTo
  ) {
    name
    born
    bookCount
  }
}
`

const LOGGED_USER = gql`
{
  me {
    favoriteGenre
  }  
}`

const BOOK_ADDED = gql`
subscription bookAdded {
  bookAdded {
  ...BookDetails
  }
}
${BOOK_DETAILS}
`

const App = () => {
  const [page, setPage] = useState('authors')
  const [token, setToken] = useState(null)
  const allAuthorsResult = useQuery(ALL_AUTHORS)
  const allBooksResult = useQuery(ALL_BOOKS)
  const loggedUserResult = useQuery(LOGGED_USER, { pollInterval: 2000 })
  const client = useApolloClient()

  const [addBook] = useMutation(ADD_BOOK, {
    refetchQueries: [{ query: ALL_AUTHORS }, { query: ALL_BOOKS }]
  })

  const [editAuthor] = useMutation(EDIT_AUTHOR, {
    refetchQueries: [{ query: ALL_AUTHORS }]
  })

  const [login] = useMutation(LOGIN)

  useSubscription(BOOK_ADDED, {
    onSubscriptionData: ({ subscriptionData }) => {
      const book = subscriptionData.data.bookAdded
      window.alert(`${book.title} by ${book.author.name} was added`)
      const dataInStore = client.readQuery({ query: ALL_AUTHORS })
      if (dataInStore.allAuthors
        .map(author => author.name).includes(book.author.name)) {
        dataInStore.allAuthors = dataInStore.allAuthors
          .map(author => author.name === book.author.name
            ? book.author
            : author
          )
      } else {
        dataInStore.allAuthors.push(book.author)
      }
      client.writeQuery({
        query: ALL_AUTHORS,
        data: dataInStore
      })
    }
  })

  useEffect(() => {
    setToken(localStorage.getItem("library-user-token"))
  }, [])

  const handleLogout = () => {
    setToken(null)
    localStorage.clear()
    client.resetStore()
    setPage("authors")
  }

  return (
    <div>
      <div>
        <button onClick={() => setPage('authors')}>authors</button>
        <button onClick={() => setPage('books')}>books</button>
        {token
          ? <button onClick={() => setPage('add')}>add book</button>
          : <button onClick={() => setPage("login")}>login</button>
        }
        {token
          ? <button onClick={() => setPage("recommendations")}>
            recommend
            </button>
          : null
        }
        {token
          ? <button onClick={handleLogout}>logout</button>
          : null
        }
      </div>

      <Authors show={page === 'authors'}
        result={allAuthorsResult} editAuthor={editAuthor} token={token} />

      <Books show={page === 'books'}
        result={allBooksResult} />

      <NewBook show={page === 'add'} addBook={addBook} />

      <LoginForm
        show={page === "login"} login={login}
        setToken={setToken} setPage={setPage}
      />

      <Recommendations
        show={page === "recommendations"} result={loggedUserResult} />

    </div>
  )
}

export default App