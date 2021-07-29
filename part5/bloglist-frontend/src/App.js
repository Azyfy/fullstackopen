import React, { useState, useEffect } from 'react'
import Blog from './components/Blog'
import Notification from './components/Notification'
import blogService from './services/blogs'
import loginServices from "./services/login"

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState("") 
  const [password, setPassword] = useState("")
  const [user, setUser] = useState(null)
  const [errorMessage, setErrorMessage] = useState(null)

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )  
  }, [])

  const handleLogin = async (event) => {
    event.preventDefault()
    
    try {
      const user = await loginServices.login({
        username, password,
      })
      window.localStorage.setItem(
        'loggedUser', JSON.stringify(user)
        ) 
      setUser(user)
      setUsername("")
      setPassword("")
    }
    catch (exception) {
      setErrorMessage('Wrong credentials')
      setTimeout(() => {
        setErrorMessage(null)
      }, 3000)
    }

  }

  const loginForm = () => {
    return (
    <form onSubmit={handleLogin}>
      <h3> Log in to application </h3>

      <Notification message={errorMessage} />

      <div>
        Username
          <input type="text" value={username} name="Username" onChange={({ target }) => setUsername(target.value) } />
      </div>
      <div>
        Password
          <input type="password" value={password} name="Password" onChange={({ target }) => setPassword(target.value) } />
      </div>
      <button>Log In</button>
    </form>
    )
  }

  const logOut = () => {
    window.localStorage.removeItem(
      'loggedUser', JSON.stringify(user)
      ) 
    setUser(null)
  }

  if (user === null) {
    return loginForm()
  }

  return (
    <div>
      <div>
        <h2>Blogs</h2>
        <p> {user.name} logged in <button onClick={logOut} >Logout</button> </p> 
        {blogs.map(blog =>
          <Blog key={blog.id} blog={blog} />
        )}
      </div>
    </div>
  )
}

export default App