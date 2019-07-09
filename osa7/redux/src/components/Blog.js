import React from "react"
import { connect } from "react-redux"
import {
    displayErrorNotification,
    displaySuccessNotification
} from "../reducers/notificationReducer"
import { addLike, removeBlog, addComment } from "../reducers/blogReducer"
import { withRouter } from "react-router-dom"
import { useField } from "../hooks/index"

const Blog = (props) => {
    const blog = props.blog
    const user = props.user
    const comment = useField("text")

    if (blog === undefined || user === undefined) {
        return null
    }

    const addLikeToThis = () => {
        try {
            props.addLike(blog)
        } catch (exception) {
            props.displayErrorNotification("failed to update blog")
            props.notificationCleaner()
        }
    }

    const removeThisBlog = () => {
        try {
            if (window.confirm(`remove blog ${blog.title} by ${blog.author}`)) {
                props.removeBlog(blog)
                props.displaySuccessNotification(
                    `Blog ${blog.title} by ${blog.author} was removed`)
                props.notificationCleaner()
                props.history.push("/")
            }
        } catch (exception) {
            props.displayErrorNotification("failed to remove blog")
            props.notificationCleaner()
        }
    }

    const addComment = (event) => {
        event.preventDefault()
        props.addComment(blog, comment.value)
        comment.reset()
    }

    return (
        <div className="blog">
            <h2>{blog.title} {blog.author}</h2>
            <a href={blog.url} alt="Blog url">{blog.url}</a>
            <div>
                {blog.likes} likes
                <button onClick={() => addLikeToThis()}
                    data-cy="blog-add-like">like</button>
                <p>added by {blog.user.name}</p>
                {blog.user.name === user.name
                    ? <button onClick={() => removeThisBlog()}
                        data-cy="remove-blog">
                        remove
                    </button>
                    : null
                }
                <h3>comments</h3>
                <form onSubmit={addComment}>
                    <input {...comment} reset={""}
                        data-cy="blog-comment-input" />
                    <button type="submit"
                        data-cy="blog-comment-submit">add comment</button>
                </form>
                <ul data-cy="blog-comment-list">
                    {blog.comments.map(comment => <li key={comment}>
                        {comment}</li>)}
                </ul>
            </div>
        </div>
    )
}

const mapDispatchToProps = {
    addLike, removeBlog, addComment,
    displayErrorNotification, displaySuccessNotification
}

const mapStateToProps = (state, ownProps) => {
    return {
        blogs: state.blogs,
        user: state.user,
        blog: ownProps.blog,
        notificationCleaner: ownProps.notificationCleaner,
    }
}

export default connect(
    mapStateToProps, mapDispatchToProps)(withRouter(Blog))
