import usersService from '../services/usersService'

const usersReducer = (state = null, action) => {
  switch(action.type) {
  case 'SET_USER':
    return {
      ...state,
      user: action.data.user
    }
  case 'REMOVE_USER':
    return null
  case 'SET_USERS_LIST':
    return {
      ...state,
      users: action.data.users
    }
  default:
    return state
  }
}

export const setUser = (user) => {
  return async dispatch => {
    dispatch({
      type: 'SET_USER',
      data: {
        user: user
      }
    })
  }
}

export const setUsersList = () => {
  return async dispatch => {
    const users = await usersService.getAll()
    dispatch({
      type: 'SET_USERS_LIST',
      data: {
        users: users
      }
    })
  }
}

export const removeUser = () => {
  return {
    type: 'REMOVE_USER'
  }
}

export default usersReducer