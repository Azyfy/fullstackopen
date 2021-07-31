import React, { useState } from "react"

const BlogForm = ({
    createNewBlog,
    }) => {

        const [title, setTitle] = useState("")
        const [author, setAuthor] = useState("")
        const [url, setURL] = useState("")

        const handleBlogPost =  (event) => {
            event.preventDefault()

            const newBlog = {
                title,
                author,
                url,
            }

            createNewBlog(newBlog)

              setTitle("")
              setAuthor("")
              setURL("")
        }


        return (
            <div>
            <h3>Create new</h3>
            <form onSubmit={handleBlogPost} >
            <div>
                Title:
                <input type="text" value={title} name="Title" onChange={ ({ target }) => setTitle(target.value) } />
            </div>
            <div>
                Author:
                <input type="text" value={author} name="Author" onChange={ ({ target }) => setAuthor(target.value) } />
            </div>
            <div>
                url:
                <input type="text" value={url} name="url" onChange={ ({ target }) => setURL(target.value) } />
            </div>
            <button>Create</button>
            </form>
        </div>
        )
}

export default BlogForm