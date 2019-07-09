const commentsRouter = require("express").Router()
const Blog = require("../models/blog")

commentsRouter.post("/", async (req, res, next) => {
  const body = req.body
  try {
      const commentedBlog = await Blog.findById(req.blogId)
      if (!commentedBlog.comments) {
        commentedBlog.comments = []
      }
      commentedBlog.comments = commentedBlog.comments.concat(body.comment)
      await commentedBlog.save()
      res.status(201).json(body.comment)
  } catch(exception) {
      next(exception)
  }
})

module.exports = commentsRouter