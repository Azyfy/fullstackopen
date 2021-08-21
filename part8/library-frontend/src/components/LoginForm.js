import React, { useEffect, useState } from "react"
import { LOGIN, USER } from "../quaries"
import { useMutation, useLazyQuery } from "@apollo/client"

const LoginForm = ({ show, setPage, setToken, setUser }) => {
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")

    const [ getUser, resultUser ] = useLazyQuery(USER)

    const [login, result] = useMutation(LOGIN, {
        onError: (error) => {
            console.log( "ERROR", error)
        }
    })

    useEffect(() => {
        if (resultUser.data) {
            localStorage.setItem("user", JSON.stringify(resultUser.data.me))
            setUser(resultUser.data.me)
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
      }, [resultUser])

    useEffect(() => {
        if (result.data) {
            const token = result.data.login.value

            getUser()

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