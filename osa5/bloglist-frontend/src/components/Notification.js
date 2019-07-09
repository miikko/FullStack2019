import React from "react"

const Notification = ({ message, type }) => {
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
        <div style={style}>{message}</div>
    )
}

export default Notification
