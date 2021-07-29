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
  const [title, setTitle] = useState("") 
  const [author, setAuthor] = useState("") 
  const [url, setURL] = useState("") 

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )  
  }, [])

  useEffect( () => {
    const loggedUser = window.localStorage.getItem("loggedUser")
    if (loggedUser) {
      const user =JSON.parse(loggedUser)
      setUser(user)
      blogService.setToken(user.token)
    }

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
      blogService.setToken(user.token)
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

  const handleBlogPost = async (event) => {
    event.preventDefault()
    console.log(title, author, url)

    try {
      const newBlog = await blogService.create({
        title, author, url,
      })

      setBlogs( blogs.concat(newBlog) )

      setErrorMessage(`New glog added by the title: ${newBlog.title}`)
      setTimeout(() => {
        setErrorMessage(null)
      }, 3000)

      setTitle("")
      setAuthor("")
      setURL("")
    }
    catch (exception) {
      setErrorMessage('Blog not created')
      setTimeout(() => {
        setErrorMessage(null)
      }, 3000)
    }

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
      <div>
        <h3>Create new</h3>
        <Notification message={errorMessage} />
        <form onSubmit={handleBlogPost} >
          <div>
            Title:
            <input type="text" value={title} name="Title" onChange={({ target }) => setTitle(target.value) } />
          </div>
          <div>
            Author:
            <input type="text" value={author} name="Author" onChange={({ target }) => setAuthor(target.value) } />
          </div>
          <div>
            url:
            <input type="text" value={url} name="url" onChange={({ target }) => setURL(target.value) } />
          </div>
          <button>Create</button>
        </form>
      </div>
    </div>
  )
}

export default App