import React, { useEffect } from "react"
import { connect } from "react-redux"
import { Route, Link } from "react-router-dom"
import NavigationBar from "./components/NavigationBar"
import Blog from "./components/Blog"
import CreateBlogForm from "./components/CreateBlogForm"
import Notification from "./components/Notification"
import Togglable from "./components/Togglable"
import Users from "./components/Users"
import User from "./components/User"
import Login from "./components/Login"
import { hideNotification } from "./reducers/notificationReducer"
import { initializeBlogs } from "./reducers/blogReducer"
import { initializeUser } from "./reducers/loginReducer"
import { initializeUsers } from "./reducers/usersReducer"


const App = (props) => {
    const blogs = props.blogs
    const users = props.users
    const user = props.user
    const toggleRef = React.createRef()

    const blogStyle = {
        paddingTop: 10,
        paddingLeft: 2,
        border: "solid",
        borderWidth: 1,
        marginBottom: 5
    }

    useEffect(() => {
        props.initializeUser()
        props.initializeUsers()
        props.initializeBlogs(blogs)
    }, [])

    const notificationCleaner = () => {
        setTimeout(() => {
            props.hideNotification()
        }, 5000)
    }

    const hideForm = () => {
        toggleRef.current.toggleVisibility()
    }

    const blogView = () => (
        <div>
            <Togglable buttonLabel="create new" ref={toggleRef}>
                <CreateBlogForm
                    hideForm={hideForm}
                    notificationCleaner={notificationCleaner}
                />
            </Togglable>
            {blogs
                .sort((a, b) => b.likes - a.likes)
                .map(blog =>
                    <div style={blogStyle} key={blog.id}>
                        <Link to={`/blogs/${blog.id}`}
                            className="blogLink">
                            {blog.title} {blog.author}
                        </Link>
                    </div>
                )}
        </div>
    )

    return (
        <div className="container">
            {user
                ? <div>
                    <NavigationBar />
                    <h1 style={{ textAlign: "center" }}
                        data-cy="home-title">Blog app</h1>
                    <Notification />
                </div>
                : ""
            }
            <Route exact path="/" render={() => user
                ? blogView()
                : <Login />} />
            <Route exact path="/users" render={() => <Users />} />
            <Route exact path="/users/:id"
                render={({ match }) => <User user={users.find(
                    user => user.id === match.params.id)} />} />
            <Route exact path="/blogs/:id"
                render={({ match }) => <Blog blog={blogs.find(
                    blog => blog.id === match.params.id)}
                notificationCleaner={notificationCleaner} />} />

        </div>
    )
}

const mapStateToProps = (state) => {
    return {
        blogs: state.blogs,
        user: state.user,
        users: state.users
    }
}

const mapDispatchToProps = {
    hideNotification, initializeBlogs, initializeUser, initializeUsers
}

export default connect(
    mapStateToProps, mapDispatchToProps)(App)