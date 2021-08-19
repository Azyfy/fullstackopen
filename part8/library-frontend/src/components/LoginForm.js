import React, { useEffect, useState } from "react"
import { LOGIN } from "../quaries"
import { useMutation } from "@apollo/client"

const LoginForm = ({ show, setPage, setToken }) => {
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")

    const [login, result] = useMutation(LOGIN, {
        onError: (error) => {
            console.log( "ERROR", error)
        }
    })

    useEffect(() => {
        if (result.data) {

            const token = result.data.login.value

            setToken(token)
            localStorage.setItem("user-token", token)
            setPage("authors")
        }
         // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [result.data])

    if (!show) {
        return null
      }

    const handleSubmit = async (event) => {
        event.preventDefault()

        login({ variables: { username, password } })
    }

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <div>
                    name
                    <input type="text" onChange={({ target }) => setUsername(target.value) } />
                </div>
                <div>
                    password
                    <input type="password" onChange={({ target }) => setPassword(target.value) } />
                </div>
                <button>Submit</button>
            </form>
        </div>
    )
}

export default LoginForm