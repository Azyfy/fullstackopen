const mongoose = require("mongoose")
const supertest = require("supertest")
const app = require("../app")

const api = supertest(app)

const Blog = require("../models/blog")

const initialBlogs = [
    {
      _id: "5a422a851b54a676234d17f7",
      title: "React patterns",
      author: "Michael Chan",
      url: "https://reactpatterns.com/",
      likes: 7,
      __v: 0
    },
    {
      _id: "5a422aa71b54a676234d17f8",
      title: "Go To Statement Considered Harmful",
      author: "Edsger W. Dijkstra",
      url: "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
      likes: 5,
      __v: 0
    }
  ]

beforeEach( async () => {
    await Blog.deleteMany({})
    let blogObject = new Blog(initialBlogs[0])
    await blogObject.save()
    blogObject = new Blog(initialBlogs[1])
    await blogObject.save()
})



test("blogs are returned as json", async () => {
    await api
        .get("/api/blogs")
        .expect(200)
        .expect("Content-Type", /application\/json/)
})

test("verifies that the unique identifier property of the blog posts is named id", async () => {
    const response  =  await api
                        .get("/api/blogs")

    const blogs = response.body

    expect(blogs[0].id).toBeDefined()
})

test("verifies that making an HTTP POST request to the /api/blogs url successfully creates a new blog post", async () => {
    const newBlog  =  {
        title: 'Testing',
        author: 'Pengu',
        url: 'https://fullstackopen.com/en/part4/testing_the_backend',
        likes: 11,
    }

    await api
        .post("/api/blogs")
        .send(newBlog)
        .expect(201)
        .expect('Content-Type', /application\/json/)
    
    const response = await api.get('/api/blogs')
    const blogs = response.body

    const authors = blogs.map(blog => blog.author)

    expect(blogs).toHaveLength(initialBlogs.length + 1)
    expect(authors).toContain(
        'Pengu'
      )
})

afterAll(() => {
    mongoose.connection.close()
})