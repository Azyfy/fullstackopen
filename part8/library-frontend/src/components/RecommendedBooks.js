import React from 'react'
import { USER } from "../quaries"
import { useQuery } from '@apollo/client'

const RecommendedBooks = ({ show, books}) => {

  const resultUser = useQuery(USER)
  resultUser.refetch()

  if (!show) {
    return null
  }

  const favoriteGenre = resultUser.data.me.favoriteGenre

  const recommendedBooks = books.filter(book => book.genres.includes(favoriteGenre))

  return (
    <div>
      <h2>books</h2>
      Books in your favorite genre { favoriteGenre }
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>
              author
            </th>
            <th>
              published
            </th>
          </tr>
          {recommendedBooks.map(a =>
            <tr key={a.title}>
              <td>{a.title}</td>
              <td>{a.author.name}</td>
              <td>{a.published}</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  )
}

export default RecommendedBooks