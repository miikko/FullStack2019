import React from "react"
import { connect } from "react-redux"
import { addVote } from "../reducers/anecdoteReducer"
import { hideNotification } from "../reducers/notificationReducer"

const AnecdoteList = (props) => {

  const vote = (anecdote) => {
    props.addVote(anecdote)
    setTimeout(() => props.hideNotification(), 5000)
  }

  return (
    <div>
      {props.visibleAnecdotes.sort((a, b) => b.votes - a.votes).map(anecdote =>
        <div key={anecdote.id}>
          <div>
            {anecdote.content}
          </div>
          <div>
            has {anecdote.votes}
            <button onClick={() => vote(anecdote)}>vote</button>
          </div>
        </div>
      )}
    </div>
  )
}

const anecdotesToShow = ({ anecdotes, filter }) => {
  if (filter === "") {
    return anecdotes
  }
  return anecdotes.filter(anecdote => 
    anecdote.content.toUpperCase().includes(filter.toUpperCase()))
}

const mapStateToProps = (state) => {
  return {
    visibleAnecdotes: anecdotesToShow(state)
  }
}

const mapDispatchToProps = {
  addVote, hideNotification
}

export default connect(mapStateToProps, mapDispatchToProps)(AnecdoteList)