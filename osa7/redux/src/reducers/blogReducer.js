import blogService from "../services/blogs"

const blogReducer = (state = [], action) => {
    let id
    let changedBlog
    switch (action.type) {
    case "CHANGE_BLOG":
        id = action.data.id
        changedBlog = state.find(b => b.id === id)
        return state.map(blog => blog.id !== id ? blog : changedBlog)
    case "NEW_BLOG":
        return [...state, action.data]
    case "INIT_BLOGS":
        return action.data
    case "REMOVE_BLOG":
        id = action.data.id
        return state.filter(blog => blog.id !== id)
    default:
        return state
    }
}

export const initializeBlogs = () => {
    return async dispatch => {
        const blogs = await blogService.getAll()
        dispatch({
            type: "INIT_BLOGS",
            data: blogs
        })
    }
}

export const addLike = (blog) => {
    return async dispatch => {
        blog.likes++
        const updatedBlog = await blogService.update(blog)
        dispatch ({
            type: "CHANGE_BLOG",
            data: updatedBlog
        })
    }
}

export const addComment = (blog, comment) => {
    return async dispatch => {
        try {
            const addedComment = await blogService.createComment(
                blog.id, comment)
            blog.comments.push(addedComment)
            dispatch ({
                type: "CHANGE_BLOG",
                data: { blog }
            })
        } catch (exception) {
            console.log(exception)
        }
    }
}

export const removeBlog = (blog) => {
    return async dispatch => {
        await blogService.remove(blog)
        dispatch({
            type: "REMOVE_BLOG",
            data: blog
        })
    }
}

export const createBlog = (data) => {
    return async dispatch => {
        const newBlog = await blogService.create(data)
        dispatch({
            type: "NEW_BLOG",
            data: newBlog
        })
    }
}

export default blogReducer