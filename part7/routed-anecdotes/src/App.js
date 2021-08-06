import React, { useState } from 'react'
import { Switch, Route, Link, useParams, useRouteMatch, useHistory } from "react-router-dom"
import { useField } from "./hooks"

const Menu = ({ notification }) => {
  const padding = {
    paddingRight: 5
  }
  return (
    <div>
      <Link style={padding} to="/" >anecdotes</Link>
      <Link style={padding} to="/new" >create new</Link>
      <Link style={padding} to="/about" >about</Link>
      <p> {notification} </p>
    </div>
  )
}

const AnecdoteList = ({ anecdotes }) => (
  <div>
    <h2>Anecdotes</h2>
    <ul>
      {anecdotes.map(anecdote => {
        return (
        <li key={anecdote.id} >
          <Link to={`/anecdotes/${anecdote.id}`}>{anecdote.content}</Link> 
        </li>
        )
      })}
    </ul>
  </div>
)

const SingleAnecdote = ({ anecdote }) => {

  return (
    <div>
      <h3>{anecdote.content} by {anecdote.author} </h3>
      <p> Has {anecdote.votes} votes </p>
      <p> For more info see <a target="_blank" href={anecdote.info}>{anecdote.info}</a> </p>
    </div>
  )
}

const About = () => (
  <div>
    <h2>About anecdote app</h2>
    <p>According to Wikipedia:</p>

    <em>An anecdote is a brief, revealing account of an individual person or an incident.
      Occasionally humorous, anecdotes differ from jokes because their primary purpose is not simply to provoke laughter but to reveal a truth more general than the brief tale itself,
      such as to characterize a person by delineating a specific quirk or trait, to communicate an abstract idea about a person, place, or thing through the concrete details of a short narrative.
      An anecdote is "a story with a point."</em>

    <p>Software engineering is full of excellent anecdotes, at this app you can find the best and add more.</p>
  </div>
)

const Footer = () => (
  <div>
    Anecdote app for <a href='https://courses.helsinki.fi/fi/tkt21009'>Full Stack -websovelluskehitys</a>.

    See <a href='https://fullstackopen.com/en'>https://fullstackopen.com/en</a> 
  </div>
)

const CreateNew = (props) => {

  const content = useField("text")
  const author = useField("text")
  const info = useField("text")

  const history = useHistory()

  const handleSubmit = (e) => {
    e.preventDefault()
    props.addNew({
      content: content.field.value,
      author: author.field.value,
      info: info.field.value,
      votes: 0
    })

    history.push("/")
  }

  const handleReset = () => {
    content.reset()
    author.reset()
    info.reset()
  }

  return (
    <div>
      <h2>create a new anecdote</h2>
      <form onSubmit={handleSubmit}>
        <div>
          content
          <input name='content' {...content.field} />
        </div>
        <div>
          author
          <input name='author' {...author.field} />
        </div>
        <div>
          url for more info
          <input name='info' {...info.field} />
        </div>
        <button>create</button>
        <button type="button" onClick={handleReset} >Reset</button>
      </form>
    </div>
  )

}

const App = () => {
  const [anecdotes, setAnecdotes] = useState([
    {
      content: 'If it hurts, do it more often',
      author: 'Jez Humble',
      info: 'https://martinfowler.com/bliki/FrequencyReducesDifficulty.html',
      votes: 0,
      id: '1'
    },
    {
      content: 'Premature optimization is the root of all evil',
      author: 'Donald Knuth',
      info: 'http://wiki.c2.com/?PrematureOptimization',
      votes: 0,
      id: '2'
    }
  ])

  const match = useRouteMatch("/anecdotes/:id")
  const anecdote = match 
                ? anecdotes.find(anecdote => Number(anecdote.id) === Number(match.params.id))
                : null

  const [notification, setNotification] = useState('')

  const addNew = (anecdote) => {
    anecdote.id = (Math.random() * 10000).toFixed(0)
    setAnecdotes(anecdotes.concat(anecdote))

    setNotification(`A new ${anecdote.content} anecdote created.`)
    setTimeout(() => {
      setNotification("")
    }, 10000)
  }

  const anecdoteById = (id) =>
    anecdotes.find(a => a.id === id)

  const vote = (id) => {
    const anecdote = anecdoteById(id)

    const voted = {
      ...anecdote,
      votes: anecdote.votes + 1
    }

    setAnecdotes(anecdotes.map(a => a.id === id ? voted : a))
  }

  return (
    <div>
      <h1>Software anecdotes</h1>
      <Menu notification={notification} />
        <Switch>
          <Route path="/anecdotes/:id" >
              <SingleAnecdote anecdote={anecdote} />
          </Route>

          <Route path="/new" >
              <CreateNew addNew={addNew} />
          </Route>

          <Route path="/about" >
            <About />
          </Route>

          <Route path="/" >
            <AnecdoteList anecdotes={anecdotes} />
          </Route>
        </Switch>
      <Footer />
    </div>
  )
}

export default App;