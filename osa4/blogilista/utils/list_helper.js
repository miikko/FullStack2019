const dummy = blogs => {
    return 1
}

const totalLikes = blogs => {
    return blogs.length === 0
    ? 0
    : blogs.reduce((acc, curr) => acc + curr.likes, 0)
}

const favoriteBlog = blogs => {
    return blogs.length === 0
    ? null
    : blogs.reduce((acc, curr) => acc.likes > curr.likes ? acc : curr)
}

const mostBlogs = blogs => {
    const blogAuthors = []
    blogs.forEach(blog => {
        const blogAuthor = blogAuthors.find(
            blogAuthor => {
                return blogAuthor.author === blog.author
            }
        )
        if (blogAuthor) {
            blogAuthor.blogs++
        } else {
            blogAuthors.push({ author: blog.author, blogs: 1 })
        }
    })
    return blogs.length === 0
    ? null
    : blogAuthors.reduce((acc, curr) => acc.blogs > curr.blogs ? acc : curr)
}

const mostLikes = blogs => {
    const blogAuthors = []
    blogs.forEach(blog => {
        const blogAuthor = blogAuthors.find(
            blogAuthor => {
                return blogAuthor.author === blog.author
            }
        )
        if (blogAuthor) {
            blogAuthor.likes += blog.likes
        } else {
            blogAuthors.push({ author: blog.author, likes: blog.likes })
        }
    })
    return blogs.length === 0
    ? null
    : blogAuthors.reduce((acc, curr) => acc.likes > curr.likes ? acc : curr)
}

module.exports = {
    dummy,
    totalLikes,
    favoriteBlog,
    mostBlogs,
    mostLikes
}