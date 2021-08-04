import anecdoteService from "../services/anecdotes"

const reducer = (state = [], action) => {
 // console.log('state now: ', state)
 // console.log('action', action)

  switch(action.type) {
    case "VOTE":
      const id = action.data.id
      const anecdote = state.find(anecdote => anecdote.id === id)

      const updatedAnecdote = {
        ...anecdote,
        votes: anecdote.votes +1
      }
      
      return state.map(anecdote => anecdote.id !== id ? anecdote : updatedAnecdote )
    case "ADD_ANECDOTE":
      const anecdotes = [...state, action.data]
      return anecdotes
    case "INITIAL_ANECDOTES":
      return action.data
    default:
      return state
  }

}

export const createAnecdote = (anecdote) => {
  return {
    type: "ADD_ANECDOTE",
    data: anecdote
  }
}

export const voteAnecdote = (id) => {
  return {
    type: "VOTE",
    data: {
      id
    }
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