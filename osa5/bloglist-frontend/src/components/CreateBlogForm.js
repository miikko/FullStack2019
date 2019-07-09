import React from "react"
import blogService from "../services/blogs"
import { useField } from "../hooks"

const CreateBlogForm = ({
    blogs,
    setBlogs,
    setMessage,
    setNotificationType,
    hideForm,
    notificationCleaner
}) => {
    const title = useField("text")
    const author = useField("text")
    const url = useField("text")

    const addBlog = async (event) => {
        event.preventDefault()
        hideForm()
        try {
            const blog = {
                title: title,
                author: author,
                url: url,
            }
            const returnedBlog = await blogService.create(blog)
            setBlogs(blogs.concat(returnedBlog))
            title.reset()
            author.reset()
            url.reset()
            setMessage(`a new blog ${blog.title} by ${blog.author} added`)
            setNotificationType("success")
            notificationCleaner()
        } catch (exception) {
            setMessage("error occurred while creating blog")
            setNotificationType("error")
            notificationCleaner()
            console.log(exception)
        }
    }

    return (
        <div>
            <h2>create new</h2>
            <form onSubmit={addBlog}>
                <div>
                    title:
                    <input {...title} reset={""} />
                </div>
                <div>
                    author:
                    <input {...author} reset={""} />
                </div>
                <div>
                    url:
                    <input {...url} reset={""} />
                </div>
                <button type="submit">create</button>
            </form>
        </div>
    )
}

export default CreateBlogForm
