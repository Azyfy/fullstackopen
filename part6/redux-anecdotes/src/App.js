import React from 'react'
import { useSelector, useDispatch } from 'react-redux'

const App = () => {
  const anecdotes = useSelector(state => state)
  const dispatch = useDispatch()

  anecdotes.sort(function(a, b){return b.votes - a.votes})

  const vote = (id) => {
    const action = {
      type: "VOTE",
      data: {
        id
      }
    }
    dispatch(action)
  }

  const getId = () => (100000 * Math.random()).toFixed(0)

  const addAnnecdote = (event) => {
    event.preventDefault()

    const content = event.target.anecdote.value
    event.target.anecdote.value=""

    const action = {
      type: "ADD_ANECDOTE",
      data: {
        content,
        votes: 0,
        id: getId()
      }
    }
    dispatch(action)
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