import React, { useState } from 'react'
const Blog = ({blog}) => {
  const [ toggle, setToggle ] = useState(false)

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  const dislplayVisible = { display: toggle ? "" : "none" }

  return (
  <div style={blogStyle} >
    {blog.title} {blog.author} 
    <button onClick={() => setToggle(!toggle) } > {toggle ? "Hide" : "View" } </button>

    <div style={ dislplayVisible } >
      <p> {blog.url} </p>
      <p> {blog.likes} <button>Like</button> </p>
      <p> {blog.user.name} </p>
    </div>
  </div>  
)
  }

export default Blog