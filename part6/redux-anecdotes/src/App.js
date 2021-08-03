import React from 'react'
import AnecdotesList from './components/AnecdotesList'
import AnecdotesForm from './components/AnecdoteForm'
import Notification from './components/Notification'

const App = () => {
  return (
    <div>
      <h2>Anecdotes</h2>
      <Notification />
      <AnecdotesList />
      <AnecdotesForm />
    </div>
  )
}

export default App