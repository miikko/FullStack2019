import React, { useState } from "react"
import PropTypes from "prop-types"

const Blog = ({ blog, addLike, removeBlog, user }) => {
    const [expanded, setExpanded] = useState(false)

    const blogStyle = {
        paddingTop: 10,
        paddingLeft: 2,
        border: "solid",
        borderWidth: 1,
        marginBottom: 5
    }

    const expand = () => {
        setExpanded(!expanded)
    }

    const normalView = () => (
        <div onClick={expand} className="normalView">
            {blog.title} {blog.author}
        </div>
    )

    const expandedView = () => (
        <div className="expandedView">
            {normalView()}
            <a href={blog.url} alt="Blog url">{blog.url}</a>
            <div>
                {blog.likes} likes
                <button onClick={() => addLike(blog)}>like</button>
                <p>added by {blog.user.name}</p>
                {blog.user.name === user.name
                    ? <button onClick={() => removeBlog(blog)}>remove</button>
                    : null
                }
            </div>
        </div>
    )

    return (
        <div style={blogStyle} className="blog">
            {expanded ?
                expandedView() :
                normalView()
            }
        </div>
    )
}

Blog.propTypes = {
    blog: PropTypes.object.isRequired,
    user: PropTypes.object.isRequired
}

export default Blog