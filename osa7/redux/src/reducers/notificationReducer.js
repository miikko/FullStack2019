
const initialState = {
    message: null,
    notificationType: null
}

const notificationReducer = (state = initialState, action) => {
    let changedState
    switch (action.type) {
    case "DISPLAY_SUCCESS_NOTIFICATION":
        changedState = {
            message: action.data.message,
            notificationType: "success"
        }
        return changedState
    case "DISPLAY_ERROR_NOTIFICATION":
        changedState = {
            message: action.data.message,
            notificationType: "error"
        }
        return changedState
    case "HIDE_NOTIFICATION":
        return initialState
    default:
        return state
    }
}

export const displaySuccessNotification = (message) => {
    return {
        type: "DISPLAY_SUCCESS_NOTIFICATION",
        data: { message }
    }
}

export const displayErrorNotification = (message) => {
    return {
        type: "DISPLAY_ERROR_NOTIFICATION",
        data: { message }
    }
}

export const hideNotification = () => {
    return {
        type: "HIDE_NOTIFICATION",
        data: {}
    }
}

export default notificationReducer