import React, { useState } from "react"
import { UPDATE_AUTHOR_BIRTHYEAR } from "../quaries"
import { useMutation } from "@apollo/client"
import Select from 'react-select';

const AuthorBirthForm = ({ authors }) => {
    const [ born, setBorn ] = useState("")
    const [ selectedOption, setSelectedOption ] = useState(null)

    const options = authors.map(author => {
        return { value: author.name, label: author.name } 
    })

    const [ updateAuthor ] = useMutation(UPDATE_AUTHOR_BIRTHYEAR, {
        onError: (error) => {   console.log( "ERROR", error)    }
      })

    const handleSubmit = (e) => {
        e.preventDefault()
        
        const name = selectedOption.value

        updateAuthor({ variables: { name, born } })

        setBorn("")
    }

    return(
        <div>
            <h3> Set birthyear </h3>
            <form onSubmit={handleSubmit}>
                <div>
                Author
                <Select
                    defaultValue={selectedOption}
                    onChange={setSelectedOption}
                    options={options}
                />
                </div>
                <div>
                Born
                <input
                    type='number'
                    value={born}
                    onChange={({ target }) => setBorn(Number(target.value))}
                />
                </div>
                <button type='submit'>Update author</button>
            </form>
        </div>
    )
}

export default AuthorBirthForm