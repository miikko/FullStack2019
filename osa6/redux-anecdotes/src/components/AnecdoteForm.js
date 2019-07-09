import React from "react"
import { connect } from "react-redux"
import { addAnecdote } from "../reducers/anecdoteReducer"
import { hideNotification } from "../reducers/notificationReducer"

const AnecdoteForm = (props) => {

  const create = async (event) => {
    event.preventDefault()
    const content = event.target.anecdote.value
    event.target.anecdote.value = ""
    props.addAnecdote(content)
    setTimeout(() => props.hideNotification(), 5000)
  }

  return (
    <div>
      <h2>create new</h2>
      <form onSubmit={create}>
        <div><input name="anecdote" /></div>
        <button type="submit">create</button>
      </form>
    </div>
  )
}

const mapDispatchToProps = {
  addAnecdote, hideNotification
}

export default connect(null, mapDispatchToProps)(AnecdoteForm)