import React from "react"

const BlogForm = ({
    handleBlogPost,
    handleTitleChange,
    handleAuthorChange,
    handleUrlChange,
    title,
    author,
    url,


    }) => {
        return (
            <div>
            <h3>Create new</h3>
            <form onSubmit={handleBlogPost} >
            <div>
                Title:
                <input type="text" value={title} name="Title" onChange={ handleTitleChange } />
            </div>
            <div>
                Author:
                <input type="text" value={author} name="Author" onChange={ handleAuthorChange } />
            </div>
            <div>
                url:
                <input type="text" value={url} name="url" onChange={ handleUrlChange } />
            </div>
            <button>Create</button>
            </form>
        </div>
        )
}

export default BlogForm