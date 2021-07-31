import React, { useState, useEffect, useRef } from "react"
import Blog from "./components/Blog"
import Notification from "./components/Notification"
import BlogForm from "./components/BlogForm"
import Toggleable from "./components/Toggleable"
import Login from "./components/Login"
import blogService from "./services/blogs"
import loginServices from "./services/login"

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [user, setUser] = useState(null)
  const [errorMessage, setErrorMessage] = useState(null)

  const blogFormRef = useRef()

  useEffect( () => {
    const loggedUser = window.localStorage.getItem("loggedUser")
    if (loggedUser) {
      const user =JSON.parse(loggedUser)
      setUser(user)
      blogService.setToken(user.token)
    }

  }, [])

  useEffect(() => {
    blogService.getAll().then(blogs => {
      blogs.sort((a, b) => {return b.likes - a.likes})
      setBlogs( blogs )
    }
    )
  }, [])

  const handleLogin = async (event) => {
    event.preventDefault()

    try {
      const user = await loginServices.login({
        username, password,
      })
      window.localStorage.setItem(
        "loggedUser", JSON.stringify(user)
        )
      blogService.setToken(user.token)
      setUser(user)
      setUsername("")
      setPassword("")
    }
    catch (exception) {
      setErrorMessage("Wrong credentials")
      setTimeout(() => {
        setErrorMessage(null)
      }, 3000)
    }
  }

  const handleUsernameChange = (value) => {
    setUsername(value)
  }

  const handlePasswordChange = (value) => {
    setPassword(value)
  }

  const createNewBlog = async (blog) => {

    blogFormRef.current.toggleVisible()

    try {
      const newBlog = await blogService.create(blog)

      setBlogs( blogs.concat(newBlog) )

      setErrorMessage(`New glog added by the title: ${newBlog.title}`)
      setTimeout(() => {
        setErrorMessage(null)
      }, 3000)
    }
    catch (exception) {
      setErrorMessage("Blog not created")
      setTimeout(() => {
        setErrorMessage(null)
      }, 3000)
    }
  }

  const deleteBlog = async (removeBlog) => {
    if (window.confirm(`Remove ${removeBlog.title}?`)) {
        try {
          await blogService.deleteBlog(removeBlog.id)

          setBlogs( blogs.filter( blog => blog.id !== removeBlog.id ) )
        }
        catch (exception) {
          console.log(exception)
        }
      }
  }

  const logOut = () => {
    window.localStorage.removeItem(
      "loggedUser", JSON.stringify(user)
      )
    setUser(null)
  }

  if (user === null) {
    return (
    <Login handleLogin={handleLogin}
    errorMessage={errorMessage}
    handleUsernameChange={handleUsernameChange}
    handlePasswordChange={handlePasswordChange}
    username={username}
    password={password} />
    )
  }

  return (
    <div>
      <div>
        <h2>Blogs</h2>
        <p> {user.name} logged in <button onClick={logOut} >Logout</button> </p>
        {blogs.map(blog =>
          <Blog key={blog.id} blog={blog} deleteBlog={deleteBlog} />
        )}
      </div>
      <Notification message={errorMessage} />
      <Toggleable buttonLabel="Create new blog" ref={blogFormRef} >
        <BlogForm createNewBlog={ createNewBlog } user={user} />
      </Toggleable>
    </div>
  )
}

export default App