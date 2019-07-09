import React from "react"
import { useField } from "../hooks/index"
import { login } from "../reducers/loginReducer"
import { connect } from "react-redux"
import { Form, Button } from "react-bootstrap"
import Notification from "../components/Notification"

const Login = (props) => {
    const username = useField("text")
    const password = useField("password")

    const handleLogin = (event) => {
        event.preventDefault()
        const u = {
            username: username.value,
            password: password.value
        }
        props.login(u)
        username.reset()
        password.reset()
    }

    return (
        <div className="login">
            <h2>Log in to application</h2>
            <Notification />
            <Form onSubmit={handleLogin}>
                <Form.Group>
                    <Form.Label>käyttäjätunnus:</Form.Label>
                    <Form.Control {...username}
                        reset={""} data-cy="login-username" />
                </Form.Group>
                <Form.Group>
                    <Form.Label>salasana:</Form.Label>
                    <Form.Control {...password}
                        reset={""} data-cy="login-password" />
                </Form.Group>
                <Button variant="primary"
                    type="submit" data-cy="login-submit">kirjaudu</Button>
            </Form>
        </div>
    )
}

const mapDispatchToProps = {
    login
}

export default connect(null, mapDispatchToProps)(Login)




