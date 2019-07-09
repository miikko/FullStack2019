

const initialState = {
  message: "",
  visible: false
}

const notificationReducer = (state = initialState, action) => {
  switch (action.type) {
    case "ADD_VOTE":
      const changedState = {
        message: `you voted '${action.data.content}'`,
        visible: true
      }
      return changedState
    case "NEW_ANECDOTE": 
      return {
        message: `you added '${action.data.content}'`,
        visible: true
      }
    case "HIDE_NOTIFICATION":
      return {
        message: state.message,
        visible: false
      }
    default:
      return state
  }
}


export const hideNotification = () => {
  return {
    type: "HIDE_NOTIFICATION",
    data: {}
  }
}


export default notificationReducer