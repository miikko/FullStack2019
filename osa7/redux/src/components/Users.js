import React from "react"
import { Link } from "react-router-dom"
import { connect } from "react-redux"

const Users = (props) => (
    <div>

        <h2>Users</h2>
        <table>
            <tbody>
                <tr>
                    <td></td>
                    <td style={{ fontWeight: "bold" }}>blogs created</td>
                </tr>
                {props.users.map(user =>
                    <tr key={user.id}>
                        <td><Link to={`/users/${user.id}`}>{user.name}</Link></td>
                        <td>{user.blogs.length}</td>
                    </tr>)}
            </tbody>
        </table>

    </div>
)


const mapStateToProps = (state) => {
    return {
        users: state.users
    }
}

export default connect(mapStateToProps)(Users)