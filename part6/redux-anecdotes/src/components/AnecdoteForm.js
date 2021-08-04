import React from 'react'
import { useDispatch } from 'react-redux'
import { createAnecdote } from '../reducers/anecdoteReducer'
import { displayMessage, removeMessage } from '../reducers/notificationReducer'
import anecdoteService from "../services/anecdotes"

const AnecdotesForm = () => {
    const dispatch = useDispatch()

    const addAnnecdote = async (event) => {
        event.preventDefault()
    
        const content = event.target.anecdote.value
        event.target.anecdote.value=""
    
        const newAnecdote = await anecdoteService.addNew(content)
        dispatch(createAnecdote(newAnecdote))

        dispatch(displayMessage(`Added a new anecdote: ${content}`))
        setTimeout(() => { 
            dispatch(removeMessage())
        }, 5000);
      }

    return (
        <div>
            <h2>create new</h2>
            <form onSubmit={addAnnecdote}>
                <div><input name="anecdote" /></div>
                <button>create</button>
            </form>
        </div>
    )
}

export default AnecdotesForm