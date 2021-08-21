
import { useApolloClient, useQuery, useLazyQuery } from '@apollo/client'
import React, { useEffect, useState } from 'react'
import Authors from './components/Authors'
import Books from './components/Books'
import NewBook from './components/NewBook'
import LoginForm  from "./components/LoginForm"
import RecommendedBooks from './components/RecommendedBooks'
import { ALL_AUTHORS, ALL_BOOKS, ALL_BOOKS_WITH } from "./quaries"

const App = () => {
  const [page, setPage] = useState('authors')
  const [token, setToken] = useState(null)
  const [user, setUser] = useState(null)
  const [recommendedBooks, setRecommendedBooks] = useState([])

  const result = useQuery(ALL_AUTHORS)
  const result2 = useQuery(ALL_BOOKS)
  const client = useApolloClient()


  const [ getRecommendedBooks, resultRecommended ] = useLazyQuery(ALL_BOOKS_WITH )

  useEffect(() => {
    const localToken = window.localStorage.getItem("user-token")
    const localUser = window.localStorage.getItem("user")

    if(localToken) {
      setToken(localToken)
      setUser(JSON.parse(localUser))
    }
  }, [])

  useEffect(() => {
    if (resultRecommended.data) {
      resultRecommended.refetch()
      setRecommendedBooks(resultRecommended.data.allBooksWith)
    }  
  }, [resultRecommended])

  if (result.loading || result2.loading)  {
    return <div>loading...</div>
  }

  const handleLogout = () => {
    setToken(null)
    localStorage.clear()
    client.resetStore()
    setPage("authors")
  }

  const handleRecommended = () => {
    getRecommendedBooks({ variables: { genre: user.favoriteGenre } })
    setPage('recommended')
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
            <button onClick={handleRecommended}>recommended</button>
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
        user={user}
        books={recommendedBooks}
      />

      <LoginForm
        show={page === 'login'}
        setPage = {setPage}
        setToken={setToken}
        setUser={setUser}
      />

    </div>
  )
}

export default App