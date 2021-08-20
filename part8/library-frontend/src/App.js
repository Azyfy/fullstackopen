
import { useApolloClient, useQuery } from '@apollo/client'
import React, { useEffect, useState } from 'react'
import Authors from './components/Authors'
import Books from './components/Books'
import NewBook from './components/NewBook'
import LoginForm  from "./components/LoginForm"
import RecommendedBooks from './components/RecommendedBooks'
import { ALL_AUTHORS, ALL_BOOKS } from "./quaries"

const App = () => {
  const [page, setPage] = useState('authors')
  const [token, setToken] = useState(null)

  const result = useQuery(ALL_AUTHORS)
  const result2 = useQuery(ALL_BOOKS)
  const client = useApolloClient()

  useEffect(() => {
    const localToken = window.localStorage.getItem("user-token")

    if(localToken) {
      setToken(localToken)
    }
  }, [])

  if (result.loading || result2.loading)  {
    return <div>loading...</div>
  }

  const handleLogout = () => {
    setToken(null)
    localStorage.clear()
    client.resetStore()
    setPage("authors")
  }

  return (
    <div>
      <div>
        <button onClick={() => setPage('authors')}>authors</button>
        <button onClick={() => setPage('books')}>books</button>
        {(!token) ?
        <button onClick={() => setPage('login')}>login</button>

        :( <>
            <button onClick={() => setPage('add')}>add book</button>
            <button onClick={() => setPage('recommended')}>recommended</button>
            <button onClick={handleLogout} >logout</button>
          </>
        )
      }
      </div>

      <Authors
        show={page === 'authors'}
        tokenExists={Boolean(token)}
        authors={result.data.allAuthors}
      />

      <Books
        show={page === 'books'}
        books={result2.data.allBooks}
      />

      <NewBook
        show={page === 'add'}
      />

      <RecommendedBooks
        show={page === 'recommended'}
        books={result2.data.allBooks}
      />

      <LoginForm
        show={page === 'login'}
        setPage = {setPage}
        setToken={setToken}
      />

    </div>
  )
}

export default App