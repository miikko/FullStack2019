import React from "react"
import { connect } from "react-redux"
import { Link, withRouter } from "react-router-dom"
import { Navbar, Nav, Button } from "react-bootstrap"
import { logout } from "../reducers/loginReducer"

const NavigationBar = (props) => {
    const user = props.user

    const handleLogout = () => {
        window.localStorage.removeItem("loggedUser")
        props.logout()
        props.history.push("/")
    }

    return (
        <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
            <Navbar.Toggle aria-controls="responsive-navbar-nav" />
            <Navbar.Collapse id="responsive-navbar-nav">
                <Nav className="mr-auto">
                    <Nav.Link href="#" as="span">
                        <Link to="/" style={{ margin: 2 }}>blogs</Link>
                    </Nav.Link>
                    <Nav.Link href="#" as="span">
                        <Link to="/users" style={{ margin: 2 }}>users</Link>
                    </Nav.Link>
                </Nav>
            </Navbar.Collapse>
            <p style={{ color: "white" }}>{user.name} logged in</p>
            <Button variant="primary" onClick={handleLogout}
                style={{ margin: 2 }}>logout</Button>
        </Navbar>
    )
}

const mapDispatchToProps = {
    logout
}

const mapStateToProps = (state) => {
    return {
        user: state.user
    }
}

export default connect(
    mapStateToProps, mapDispatchToProps)(withRouter(NavigationBar))