const Blog = require("../models/blog")
const User = require("../models/user")

const initialBlogs = [
    {
        title: "First blog",
        author: "Janne",
        url: "www.first.com",
        likes: 1,
        user: {
            name: "Masa Mainio",
            username: "Masa"
        }
    },
    {
        title: "Second blog",
        author: "Mikko",
        url: "www.second.com",
        likes: 2,
        user: {
            name: "Peppi Pitkätossu",
            username: "peppitk"
        }
    },
]

const blogsInDb = async () => {
    const blogs = await Blog.find({})
    return blogs.map(blog => blog.toJSON())
}

const usersInDb = async () => {
    const users = await User.find({})
    return users.map(user => user.toJSON())
}

module.exports = {initialBlogs, blogsInDb, usersInDb}