import {getUser, postUser, updateUser, getUserByToken} from './userAdapter'
/*-------------THUNK CREATORS--------------*/
// export const updateMyUser = (user) => {
//   return (dispatch) => {
//     updateUser(user)
//     .then(updatedUser => dispatch(editUser(updatedUser)))
//   }
// }
//
// export const loadMyUsers = () => {
//   return (dispatch) => {
//     getUsers()
//     .then(allUsers => dispatch({type: "LOAD_USER", payload: allUsers}))
//   }
// }

export const createUser = (user) => {
  return (dispatch) => {
    return postUser(user)
    .then(user => {
      if (!user.error){
        localStorage.setItem("token", user.jwt)
        dispatch(setCurrentUser(user.user))
      }
    })
  }
}

export const loginUser = (user) => {
  return (dispatch) => {
    return getUser(user)
    .then(resp => {
      console.log(resp)
      if (!resp.error){
        localStorage.setItem("token", resp.jwt)
        dispatch(setCurrentUser(resp.user))
      }
    })
  }
}

export const getCurrentUser = (token) => {
  return (dispatch) =>{
    return getUserByToken(token)
    .then(resp => {
      if (!resp.error){
        localStorage.setItem("token", resp.jwt)
        dispatch(setCurrentUser(resp.user))
      }
      else{
      }
    })
  }
}

export const patchCurrentUser = (user) => {
  return (dispatch) => {
    return updateUser(user)
    .then(resp => {
      if (!resp.error){
        dispatch(setCurrentUser(resp))
      }
    })
  }
}

export const removeCurrentTrip = (user) => {
  user.current_trip_id = null
  return (dispatch) => {
    return updateUser(user)
    .then(resp => dispatch(setCurrentUser(resp)))
  }
}

export const removeUser = () => {
  return {type: 'REMOVE_USER'}
}

/*----ACTION CREATORS-----*/

// add action creators for like SET_CURRENT_USEr

export const setCurrentUser = (user) => {
  return {type: "SET_CURRENT_USER", payload: user}
}
// export const selectUser = (user) => {
//   return {type: 'SELECT_USER', payload:user }
// }
//
// const editUser = (user) => ({type: 'EDIT_USER', payload: user})
