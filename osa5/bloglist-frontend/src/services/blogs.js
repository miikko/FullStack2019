
import axios from "axios"
const baseUrl = "/api/blogs"

let token = null

const setToken = newToken => {
    token = `bearer ${newToken}`
}

const getAll = async () => {
    const res = await axios.get(baseUrl)
    return res.data
}

const create = async newBlog => {
    const config = {
        headers: { Authorization: token },
    }

    const res = await axios.post(baseUrl, newBlog, config)
    return res.data
}

const update = async blog => {
    const newBlog = {
        user: blog.user.id,
        likes: blog.likes,
        author: blog.author,
        title: blog.title,
        url: blog.url
    }
    const res = await axios.put(`${baseUrl}/${blog.id}`, newBlog)
    return res.data
}

const remove = async blog => {
    const config = {
        headers: { Authorization: token },
    }

    const res = await axios.delete(`${baseUrl}/${blog.id}`, config)
    return res
}

export default { setToken, getAll, create, update, remove }