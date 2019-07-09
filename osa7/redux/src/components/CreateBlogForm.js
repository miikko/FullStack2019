import React from "react"
import { useField } from "../hooks"
import {
    displaySuccessNotification, displayErrorNotification
} from "../reducers/notificationReducer"
import { createBlog } from "../reducers/blogReducer"
import { connect } from "react-redux"
import { Form, Button } from "react-bootstrap"


const CreateBlogForm = (props) => {
    const title = useField("text")
    const author = useField("text")
    const url = useField("text")

    const addBlog = async (event) => {
        event.preventDefault()
        props.hideForm()
        try {
            const blog = {
                title: title.value,
                author: author.value,
                url: url.value,
            }
            props.createBlog(blog)
            title.reset()
            author.reset()
            url.reset()
            props.displaySuccessNotification(
                `a new blog ${blog.title} by ${blog.author} added`)
            props.notificationCleaner()
        } catch (exception) {
            props.displayErrorNotification(
                "error occurred while creating blog")
            props.notificationCleaner()
            console.log(exception)
        }
    }

    return (
        <div>
            <h2>create new</h2>
            <Form onSubmit={addBlog}>
                <Form.Group>
                    <Form.Label>title:</Form.Label>
                    <Form.Control {...title} reset={""}
                        data-cy="blog-title" />
                </Form.Group>
                <Form.Group>
                    <Form.Label>author:</Form.Label>
                    <Form.Control {...author} reset={""}
                        data-cy="blog-author" />
                </Form.Group>
                <Form.Group>
                    <Form.Label>url:</Form.Label>
                    <Form.Control {...url} reset={""}
                        data-cy="blog-url" />
                </Form.Group>
                <Button variant="primary" type="submit"
                    data-cy="submit-blog">create</Button>
            </Form>
        </div>
    )
}

const mapStateToProps = (state, ownProps) => {
    return {
        hideForm: ownProps.hideForm,
        notificationCleaner: ownProps.notificationCleaner,
        blogs: state.blogs,
    }
}

const mapDispatchToProps = {
    displaySuccessNotification, displayErrorNotification, createBlog
}

export default connect(mapStateToProps, mapDispatchToProps)(CreateBlogForm)
