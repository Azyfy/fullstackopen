import anecdoteService from "../services/anecdotes"

const reducer = (state = [], action) => {
 // console.log('state now: ', state)
 // console.log('action', action)

  switch(action.type) {
    case "VOTE":
      const updatedAnecdote = action.data

      return state.map(anecdote => anecdote.id !== updatedAnecdote.id ? anecdote : updatedAnecdote )
    case "ADD_ANECDOTE":
      const anecdotes = [...state, action.data]
      return anecdotes
    case "INITIAL_ANECDOTES":
      return action.data
    default:
      return state
  }

}

export const createAnecdote = (content) => {
  return async dispatch => {
    const newAnecdote = await anecdoteService.addNew(content)
    dispatch({
      type: "ADD_ANECDOTE",
      data: newAnecdote
    })
  }
}

export const voteAnecdote = (anecdote) => {
  return async dispatch => {

      const updatedAnecdote = {
        ...anecdote,
        votes: anecdote.votes +1
      }

      const response = await anecdoteService.updateAnecdote(updatedAnecdote, anecdote.id)

      dispatch({
        type: "VOTE",
        data: response
    })
  }
}

export const initialAnecdotes = () => {
  return async dispatch => {
    const anecdotes = await anecdoteService.getAll()
    dispatch({
      type: "INITIAL_ANECDOTES",
      data: anecdotes
    })
  }
}

export default reducer