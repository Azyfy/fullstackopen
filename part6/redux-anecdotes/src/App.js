import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { createAnecdote, voteAnecdote } from './reducers/anecdoteReducer'

const App = () => {
  const anecdotes = useSelector(state => state)
  const dispatch = useDispatch()

  anecdotes.sort(function(a, b){return b.votes - a.votes})

  const vote = (id) => {

    dispatch(voteAnecdote(id))
  }


  const addAnnecdote = (event) => {
    event.preventDefault()

    const content = event.target.anecdote.value
    event.target.anecdote.value=""

    dispatch(createAnecdote(content))
  }

  return (
    <div>
      <h2>Anecdotes</h2>
      {anecdotes.map(anecdote =>
        <div key={anecdote.id}>
          <div>
            {anecdote.content}
          </div>
          <div>
            has {anecdote.votes}
            <button onClick={() => vote(anecdote.id)}>vote</button>
          </div>
        </div>
      )}
      <h2>create new</h2>
      <form onSubmit={addAnnecdote}>
        <div><input name="anecdote" /></div>
        <button>create</button>
      </form>
    </div>
  )
}

export default App