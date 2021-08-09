import React, { useState } from "react"
import { UPDATE_AUTHOR_BIRTHYEAR } from "../quaries"
import { useMutation } from "@apollo/client"

const AuthorBirthForm = () => {
    const [ name, setName ] = useState("")
    const [ born, setBorn ] = useState("")

    const [ updateAuthor ] = useMutation(UPDATE_AUTHOR_BIRTHYEAR, {
        onError: (error) => {   console.log( "ERROR", error)    }
      })

    const handleSubmit = (e) => {
        e.preventDefault()

        updateAuthor({ variables: { name, born } })

        setName("")
        setBorn("")
    }

    return(
        <div>
            <h3> Set birthyear </h3>
            <form onSubmit={handleSubmit}>
                <div>
                Author
                <input
                    value={name}
                    onChange={({ target }) => setName(target.value)}
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