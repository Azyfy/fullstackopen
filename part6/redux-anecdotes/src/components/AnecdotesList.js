import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { voteAnecdote } from '../reducers/anecdoteReducer'
import { displayMessage, removeMessage } from '../reducers/notificationReducer'

const AnecdotesList = () => {
    const anecdotes = useSelector(state => state.anecdotes)
    const dispatch = useDispatch()

    anecdotes.sort(function(a, b){return b.votes - a.votes})

    const vote = (anecdote) => {
        dispatch(voteAnecdote(anecdote.id))

        dispatch(displayMessage(`You voted for ${anecdote.content}`))

        setTimeout(() => { 
            dispatch(removeMessage())
        }, 5000);
    }

    return (
        <div>
            {anecdotes.map(anecdote =>
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

export default AnecdotesList