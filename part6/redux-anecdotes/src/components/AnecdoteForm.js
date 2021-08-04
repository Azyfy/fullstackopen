import React from "react"
import { connect } from "react-redux"
import { createAnecdote } from "../reducers/anecdoteReducer"
import { notify } from "../reducers/notificationReducer"

const AnecdotesForm = (props) => {

    const addAnnecdote = async (event) => {
        event.preventDefault()

        const content = event.target.anecdote.value
        event.target.anecdote.value=""

        props.createAnecdote(content)

        props.notify(`Added a new anecdote: ${content}`, 50)
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

const maprDispatchToProps = {
    createAnecdote,
    notify
}

const ConnectedAnecdotesForm = connect(
    null,
    maprDispatchToProps
)(AnecdotesForm)

export default ConnectedAnecdotesForm