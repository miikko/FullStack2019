import anecdoteService from "../services/anecdotes"

const anecdoteReducer = (state = [], action) => {
  switch (action.type) {
    case 'ADD_VOTE':
      const id = action.data.id
      const changedAnecdote = state.find(a => a.id === id)
      return state.map(anecdote => 
        anecdote.id !== id ? anecdote : changedAnecdote
      )
    case 'NEW_ANECDOTE': 
      return state.concat(action.data)
    case 'INIT_ANECDOTES':
      return action.data
    default:
      return state
  }
}

export const addVote = anecdote => {
  return async dispatch => {
    anecdote.votes++
    const updatedAnecdote = await anecdoteService.update(anecdote)
    dispatch({
      type: 'ADD_VOTE',
      data: updatedAnecdote
    })
  }
}

export const addAnecdote = content => {
  return async dispatch => {
    const newAnecdote = await anecdoteService.createNew(content)
    dispatch({
      type: 'NEW_ANECDOTE',
      data: newAnecdote
    })
  }
}

export const intializeAnecdotes = () => {
  return async dispatch => {
    const anecdotes = await anecdoteService.getAll()
    dispatch({
      type: 'INIT_ANECDOTES',
      data: anecdotes
    })
  }
}

export default anecdoteReducer