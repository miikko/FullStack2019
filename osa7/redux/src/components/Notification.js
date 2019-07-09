import React from "react"
import { connect } from "react-redux"

const Notification = (props) => {
    const message = props.message
    const type = props.notificationType
    if (message === null || type === null) {
        return null
    }
    const style = {
        background: "lightgrey",
        fontSize: 20,
        borderStyle: "solid",
        borderRadius: 5,
        padding: 10,
        marginBottom: 10
    }
    if (type === "error") {
        style.color = "red"
    } else {
        style.color = "green"
    }
    return (
        <div style={style} data-cy="notification">{message}</div>
    )
}

const mapStateToProps = (state) => {
    return {
        message: state.notification.message,
        notificationType: state.notification.notificationType
    }
}

export default connect(mapStateToProps)(Notification)
