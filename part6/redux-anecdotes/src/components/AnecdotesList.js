import React from "react"
import { useSelector, useDispatch } from "react-redux"
import { voteAnecdote } from "../reducers/anecdoteReducer"
import { notify } from "../reducers/notificationReducer"

const AnecdotesList = () => {
    const anecdotes = useSelector(state => state.anecdotes)
    const filter = useSelector(state => state.filter)
    const dispatch = useDispatch()

    const filteredAnecdotes = anecdotes.filter( anecdote => {
      return  anecdote.content.toLowerCase().includes(filter.toLowerCase())
    })

    filteredAnecdotes.sort(function(a, b){return b.votes - a.votes})

    const vote = (anecdote) => {
        dispatch(voteAnecdote(anecdote))

        dispatch(notify(`You voted for ${anecdote.content}`, 50))

    }

    return (
        <div>
            {filteredAnecdotes.map(anecdote =>
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