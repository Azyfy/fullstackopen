import React from 'react'
import AnecdotesList from './components/AnecdotesList'
import AnecdotesForm from './components/AnecdoteForm'

const App = () => {
  return (
    <div>
      <h2>Anecdotes</h2>
      <AnecdotesList />
      <AnecdotesForm />
    </div>
  )
}

export default App