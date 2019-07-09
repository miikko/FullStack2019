const blogsRouter = require("express").Router()
const commentsRouter = require("./comments")
const Blog = require("../models/blog")
const User = require("../models/user")
const jwt = require("jsonwebtoken")

blogsRouter.get("/", async (req, res, next) => {
    try {
        const blogs = await Blog
            .find({}).populate("user", { username: 1, name: 1 })
        res.json(blogs.map(blog => blog.toJSON()))
    } catch(exception) {
        next(exception)
    }
})

blogsRouter.post("/", async (req, res, next) => {
    const body = req.body
    try {
        const decodedToken = jwt.verify(req.token, process.env.SECRET)
        if (!req.token || !decodedToken.id) {
            return res.status(401).json({
                error: "token missing or invalid" 
            })
        }

        const user = await User.findById(decodedToken.id)

        const blog = new Blog({
            title: body.title,
            author: body.author,
            url: body.url,
            likes: body.likes,
            user: user._id
        })

        const savedBlog = await blog.save()
        user.blogs = user.blogs.concat(savedBlog._id)
        await user.save()
        const blogWithUser = await Blog.findById(savedBlog.id)
            .populate("user", { username: 1, name: 1 })
        res.status(201).json(blogWithUser.toJSON())
    } catch(exception) {
        next(exception)
    }
})

blogsRouter.delete("/:id", async (req, res, next) => {
    try {
        const decodedToken = jwt.verify(req.token, process.env.SECRET)
        if (!req.token || !decodedToken.id) {
            return res.status(401).json({
                error: "token missing or invalid" 
            })
        }
        const blogToRemove = await Blog.findById(req.params.id)
        if (decodedToken.id.toString() !== blogToRemove.user._id.toString()) {
            return res.status(401).json({
                error: "invalid user"
            })
        }
        await Blog.findByIdAndRemove(req.params.id)
        res.status(204).end()    
    } catch(exception) {
        next(exception)
    }
})

blogsRouter.put("/:id", async (req, res, next) => {
    try {
        const body = req.body
        const blog = {
            title: body.title,
            author: body.author,
            url: body.url,
            likes: body.likes,
            comments: body.comments
        }
        const updatedBlog = await Blog.findByIdAndUpdate(
            req.params.id, blog, { new: true }
        ).populate("user", { username: 1, name: 1 })
        res.json(updatedBlog.toJSON())
    } catch(exception) {
        next(exception)
    }
})


blogsRouter.use("/:id/comments", (req, res, next) => {
    req.blogId = req.params.id
    next()
}, commentsRouter)

module.exports = blogsRouter