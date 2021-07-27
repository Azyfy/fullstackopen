const dummy = (blogs) => {
    return 1
}

const totalLikes = (blogs) => {

    const likes = blogs.map( obj => obj.likes  )

    const total = likes.reduce( (total, number) => total + number )

    return total
}

module.exports = {
    dummy,
    totalLikes
  }