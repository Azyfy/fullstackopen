const dummy = (blogs) => {
    return 1
}

const totalLikes = (blogs) => {

    const likes = blogs.map( obj => obj.likes  )

    const total = likes.reduce( (total, number) => total + number )

    return total
}

const favoriteBlog = (blogs) => {
    
    const likes = blogs.map( obj => obj.likes  )
    
    const highestLike = Math.max(...likes)

    console.log("likes",likes)
    console.log("highestLike",highestLike)

    const topBlog = blogs.find( blog => blog.likes === highestLike )

    console.log("topBlog",topBlog)
    return topBlog
}

const mostBlogs = (blogs) => {

    const mostBlogs = {}
    
    blogs.forEach( blog => {
        mostBlogs[blog.author] =  (mostBlogs[blog.author] || 0) + 1
    } )

    const objValues =  Object.values(mostBlogs);
    const max = Math.max(...objValues);
    
    const author = Object.keys(mostBlogs).find(key => mostBlogs[key] === max)

    return { author, blogs: max }
}


const mostLikes = (blogs) => {


}

module.exports = {
    dummy,
    totalLikes,
    favoriteBlog,
    mostBlogs,
    mostLikes
  }