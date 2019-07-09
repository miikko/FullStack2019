import React, { useState, useEffect } from "react"
import Blog from "./components/Blog"
import CreateBlogForm from "./components/CreateBlogForm"
import Notification from "./components/Notification"
import Togglable from "./components/Togglable"
import blogService from "./services/blogs"
import loginService from "./services/login"
import { useField } from "./hooks"

const App = () => {
    const [blogs, setBlogs] = useState([])
    const [user, setUser] = useState(null)
    const username = useField("text")
    const password = useField("password")
    const [message, setMessage] = useState(null)
    const [notificationType, setNotificationType] = useState(null)

    const toggleRef = React.createRef()

    useEffect(() => {
        blogService.getAll().then(blogs =>
            setBlogs(blogs)
        )
    }, [])

    useEffect(() => {
        const loggedUserJSON = window.localStorage.getItem("loggedUser")
        if (loggedUserJSON) {
            const user = JSON.parse(loggedUserJSON)
            setUser(user)
            blogService.setToken(user.token)
        }
    }, [])

    const notificationCleaner = () => {
        setTimeout(() => {
            setMessage(null)
            setNotificationType(null)
        }, 5000)
    }

    const hideForm = () => {
        toggleRef.current.toggleVisibility()
    }

    const addLike = async (blog) => {
        blog.likes++
        try {
            const updatedBlog = await blogService.update(blog)
            setBlogs(blogs.map(b => b.id === blog.id ? updatedBlog : b))
        } catch (exception) {
            setMessage("failed to update blog")
            setNotificationType("error")
            notificationCleaner()
        }
    }

    const removeBlog = async (blog) => {
        try {
            if (window.confirm(`remove blog ${blog.title} by ${blog.author}`)) {
                await blogService.remove(blog)
                setBlogs(blogs.filter(b => b !== blog))
                setMessage(`Blog ${blog.title} by ${blog.author} was removed`)
                setNotificationType("success")
                notificationCleaner()
            }
        } catch (exception) {
            setMessage("failed to remove blog")
            setNotificationType("error")
            notificationCleaner()
        }
    }

    const handleLogin = async (event) => {
        event.preventDefault()
        try {
            const user = await loginService.login({
                username: username.value,
                password: password.value
            })
            window.localStorage.setItem(
                "loggedUser", JSON.stringify(user)
            )
            blogService.setToken(user.token)
            username.reset()
            password.reset()
            setUser(user)
        } catch (exception) {
            setMessage("wrong username or password")
            setNotificationType("error")
            notificationCleaner()
        }
    }

    const handleLogout = () => {
        window.localStorage.removeItem("loggedUser")
        setUser(null)
    }

    const loginView = () => (
        <div className="login">
            <h2>Log in to application</h2>
            <Notification message={message} type={notificationType} />
            <form onSubmit={handleLogin}>
                <div>
                    käyttäjätunnus
                    <input {...username} reset={""} />
                </div>
                <div>
                    salasana
                    <input {...password} reset={""} />
                </div>
                <button type="submit">kirjaudu</button>
            </form>
        </div>
    )

    const blogView = () => (
        <div>
            <h2>blogs</h2>
            <Notification message={message} type={notificationType} />
            <p>{user.name} logged in</p>
            <button onClick={handleLogout}>logout</button>
            <Togglable buttonLabel="create new" ref={toggleRef}>
                <CreateBlogForm
                    blogs={blogs}
                    setBlogs={setBlogs}
                    setMessage={setMessage}
                    setNotificationType={setNotificationType}
                    hideForm={hideForm}
                    notificationCleaner={notificationCleaner}
                />
            </Togglable>
            {blogs
                .sort((a, b) => b.likes - a.likes)
                .map(blog =>
                    <Blog
                        key={blog.id}
                        blog={blog}
                        addLike={addLike}
                        removeBlog={removeBlog}
                        user={user}
                    />
                )}
        </div>
    )

    return (
        <div>
            {user === null ?
                loginView() :
                blogView()
            }
        </div>
    )
}

export default App