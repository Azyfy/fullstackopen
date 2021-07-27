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
    
    const highestLike = Math.max(likes)

    const topBlog = blogs.find( blog => blog.likes === highestLike )

    return topBlog
}

module.exports = {
    dummy,
    totalLikes,
    favoriteBlog
  }