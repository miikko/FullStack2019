import loginService from "../services/login"
import blogService from "../services/blogs"


// eslint-disable-next-line no-unused-vars
const loginReducer = (state = null, action) => {
    switch (action.type) {
    case "LOGIN":
        return action.data
    case "LOGOUT":
        return null
    default:
        return state
    }
}

export const initializeUser = () => {
    return async dispatch => {
        const userJSON = window.localStorage.getItem("loggedUser")
        if (userJSON) {
            try {
                const user = JSON.parse(userJSON)
                blogService.setToken(user.token)
                dispatch({
                    type: "LOGIN",
                    data: user
                })
            } catch (exception) {
                console.log(exception)
            }
        }
    }
}

export const login = user => {
    return async dispatch => {
        try {
            const loggedUser = await loginService.login(user)
            blogService.setToken(loggedUser.token)
            window.localStorage.setItem(
                "loggedUser", JSON.stringify(loggedUser)
            )
            dispatch({
                type: "LOGIN",
                data: loggedUser
            })
        } catch (exception) {
            console.log(exception)
            dispatch({
                type: "DISPLAY_ERROR_NOTIFICATION",
                data: { message: "wrong username or password" }
            })
            setTimeout(() => dispatch({
                type: "HIDE_NOTIFICATION",
                data: {}
            }), 5000)
        }
    }
}

export const logout = () => {
    return {
        type: "LOGOUT",
        data: null
    }
}

export default loginReducer