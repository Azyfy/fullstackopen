import React, { useState } from 'react'
import Select from 'react-select';

const Books = (props) => {
  const [selectedGenre, seSelectedGenre] = useState({value: "All genres"})
  
  if (!props.show) {
    return null
  }

  const books = props.books

  let genres = ["All genres"]

  books.forEach(book => {
    const array = book.genres.filter(genre => !genres.includes(genre))
   
    genres = [...genres, ...array]

  })

  const options = genres.map(genre => {
    return { value: genre, label: genre } 
})

let filteredBooks = books
if(selectedGenre.value === "All genres") {
  filteredBooks = books
  }
  else {
    filteredBooks = books.filter(book => book.genres.includes(selectedGenre.value))
  }

  return (
    <div>
      <h2>books</h2>
      In genre { selectedGenre.value }
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
          {filteredBooks.map(a =>
            <tr key={a.title}>
              <td>{a.title}</td>
              <td>{a.author.name}</td>
              <td>{a.published}</td>
            </tr>
          )}
        </tbody>
      </table>
      <Select
                    defaultValue={selectedGenre}
                    onChange={seSelectedGenre}
                    options={options}
                />
    </div>
  )
}

export default Books