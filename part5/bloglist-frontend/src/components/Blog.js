import React, { useState } from "react"

const Blog = ({ blog, deleteBlog, loggedUser, updateBlog }) => {
  const [ toggle, setToggle ] = useState(false)
  const [ likes, setLikes ] = useState(blog.likes)

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: "solid",
    borderWidth: 1,
    marginBottom: 5
  }

  const likeBlog =  (blog) => {
        const updatedBlog = {
          title: blog.title,
          author: blog.author,
          url: blog.url,
          likes: blog.likes +1,
        }
        updateBlog(updatedBlog, blog.id)
        setLikes(blog.likes +1)
  }

  const dislplayVisible = { display: toggle ? "" : "none" }

  return (
  <div style={blogStyle} className="blog" >
    {blog.title} {blog.author}
    <button id="show-hide-blog-details-btn" onClick={() => setToggle(!toggle) } > {toggle ? "Hide" : "View" } </button>

    <div style={ dislplayVisible } >
      <p> {blog.url} </p>
      <p> {likes} <button id="like-btn" onClick={ () => { likeBlog(blog) } } >Like</button> </p>
      <p> {blog.user.name} </p>

      {(blog.user.name === loggedUser.name ) ?
        <button id="remove-blog-btn" onClick={ () => deleteBlog(blog) } >Remove</button>
        : <></>
        }
    </div>
  </div>
)
  }

export default Blog