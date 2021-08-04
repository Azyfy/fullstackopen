import React, { useEffect } from 'react'
import AnecdotesList from './components/AnecdotesList'
import AnecdotesForm from './components/AnecdoteForm'
import Notification from './components/Notification'
import Filter from './components/Filter'

import anecdotesService from "./services/anecdotes"
import { initialAnecdotes } from './reducers/anecdoteReducer'
import { useDispatch } from 'react-redux'

const App = () => {
  const dispatch = useDispatch()

  useEffect( () => {
    anecdotesService.getAll()
                    .then(anecdotes => dispatch(initialAnecdotes(anecdotes)))
  }, [])

  return (
    <div>
      <h2>Anecdotes</h2>
      <Notification />
      <Filter />
      <AnecdotesList />
      <AnecdotesForm />
    </div>
  )
}

export default App