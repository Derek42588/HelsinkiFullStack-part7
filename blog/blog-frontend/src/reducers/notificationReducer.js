const initialNotification = {
  message: '',
  type: 'success'
}

const notificationReducer = (state = initialNotification, action) => {
  switch(action.type) {
  case 'SET_NOTIFICATION':
    return action.data
  case 'REMOVE_NOTIFICATION':
    return {
      message: '',
      type: null
    }
  default:
    return state
  }
}

export const setNotification = (data, timeOut) => {
  return async dispatch => {
    dispatch({
      type: 'SET_NOTIFICATION',
      data: {
        message: data.message,
        type: data.type
      }
    })
    await setTimeout(() => {
      dispatch({
        type: 'REMOVE_NOTIFICATION',
      })
    }, (timeOut * 1000))
  }
}

export const removeNotification = () => {
  return {
    type: 'REMOVE_NOTIFICATION'
  }
}

export default notificationReducer