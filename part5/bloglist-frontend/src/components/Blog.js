import React, { useState } from 'react'
import blogServices from "../services/blogs"


const Blog = ({blog, deleteBlog}) => {
  const [ toggle, setToggle ] = useState(false)
  const [ likes, setLikes ] = useState(blog.likes)

  const loggedUser = JSON.parse(window.localStorage.getItem("loggedUser"))

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  const likeBlog =  (blog) => {
    return (
      async () => {
        try {

        const updateBlog = {
          title: blog.title,
          author: blog.author,
          url: blog.url,
          likes: blog.likes +1,
        }

        await blogServices.update(updateBlog, blog.id)
        setLikes(likes + 1)
        }
        catch (exception) {
          console.log(exception)
        } 
      }
    )
  }

  const dislplayVisible = { display: toggle ? "" : "none" }
  
  return (
  <div style={blogStyle} >
    {blog.title} {blog.author} 
    <button onClick={() => setToggle(!toggle) } > {toggle ? "Hide" : "View" } </button>

    <div style={ dislplayVisible } >
      <p> {blog.url} </p>
      <p> {likes} <button onClick={ likeBlog(blog) } >Like</button> </p>
      <p> {blog.user.name} </p>
      
      {(blog.user.name === loggedUser.name ) ?
        <button onClick={ () => deleteBlog(blog) } >Remove</button>
        : <></>
        }
    </div>
  </div>  
)
  }

export default Blog