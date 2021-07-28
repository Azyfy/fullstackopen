const blogsRouter = require("express").Router()
const Blog = require("../models/blog")
const User = require("../models/user")
const jwt =require("jsonwebtoken")

blogsRouter.get('/', async (request, response) => {
  
  const blogs = await Blog.find({}).populate("user", { username: 1, name: 1 })
  
  response.json(blogs)

  })
  
blogsRouter.post('/', async (request, response) => {
    const body = request.body
    
    const decodedToken = jwt.verify(request.token, process.env.SECRET)
    if(!request.token || !decodedToken.id) {
      return response.status(401).json({
        error: "Token missing or invalid"
      })
    }
  
    const user = await User.findById(decodedToken.id)

    const blog = new Blog ({
      title: body.title,
      author: body.author,
      url: body.url,
      like: body.likes,
      user: user.id,
    })

    if (!blog.likes) {
      blog.likes = 0
    }
    else if(!blog.title || !blog.url) {
      response.status(400).end()
    }

    const result = await blog.save()

    user.blogs = user.blogs.concat(result)
    await user.save()

    response.status(201).json(result)

  })

blogsRouter.delete("/:id", async (request, response) => {
  const result = await Blog.findByIdAndRemove(request.params.id)
  
  response.status(204).end()
})

blogsRouter.put("/:id", async (request, response) => {
  const body = request.body

  const blog = {
    title: body.title,
    author: body.author,
    url: body.url,
    like: body.likes,
  }

  const updatedBlog = await Blog.findByIdAndUpdate(request.params.id, blog, { new: true })

  response.json(updatedBlog)
})

module.exports = blogsRouter