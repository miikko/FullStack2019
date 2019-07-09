import usersService from "../services/users"

const usersReducer = (state = [], action) => {
    let changedState
    switch (action.type) {
    case "INITIALIZE_USERS":
        return action.data
    case "NEW_BLOG":
        changedState = state.map(user => {
            if (action.data.user.id === user.id) {
                user.blogs.push({
                    title: action.data.title,
                    author: action.data.author,
                    url: action.data.url,
                    id: action.data.id
                })
            }
            return user
        })
        return changedState
    case "REMOVE_BLOG":
        changedState = state.map(user => {
            user.blogs = user.blogs.filter(
                blog => blog.id !== action.data.id)
            return user
        })
        return changedState
    default:
        return state
    }
}

export const initializeUsers = () => {
    return async dispatch => {
        try {
            const users = await usersService.getAll()
            dispatch({
                type: "INITIALIZE_USERS",
                data: users
            })
        } catch (exception) {
            console.log(exception)
        }
    }
}

export default usersReducer