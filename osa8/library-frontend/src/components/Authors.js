import React, { useState } from 'react'

const Authors = ({ show, result, editAuthor, token }) => {
  const [name, setName] = useState("")
  const [born, setBorn] = useState("")

  if (!show) {
    return null
  } else if (result.loading) {
    return <div>loading...</div>
  }

  const submit = async (e) => {
    e.preventDefault()
    await editAuthor({ variables: { name, setBornTo: parseInt(born) } })
      .catch(error => {
        console.log(error)
      })
    setName("")
    setBorn("")
  }

  const authors = result.data.allAuthors

  return (
    <div>
      <h2>authors</h2>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>
              born
              </th>
            <th>
              books
              </th>
          </tr>
          {authors.map(a =>
            <tr key={a.name}>
              <td>{a.name}</td>
              <td>{a.born}</td>
              <td>{a.bookCount}</td>
            </tr>
          )}
        </tbody>
      </table>
      {token
        ? <div>
          <h3>Set birthyear</h3>
          <form onSubmit={submit}>
            <div>
              name
          <select value={name}
                onChange={({ target }) => setName(target.value)}>
                {authors.map(a => <option key={a.name} value={a.name}>
                  {a.name}
                </option>)}
              </select>
            </div>
            <div>
              born <input type="text" value={born}
                onChange={({ target }) => setBorn(target.value)} />
            </div>
            <button type="submit">update author</button>
          </form>
        </div>
        : null
      }

    </div>
  )
}

export default Authors