import {getUsers, getUser, postUser, deleteUser, updateUser} from './adapter'
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
      debugger
      dispatch({type: "SET_CURRENT_USER", payload:user})
    })
  }
}

export const loginUser = (user) => {
  return (dispatch) => {
    return getUser(user)
    .then(resp => {
      console.log(resp)
      if (!resp.error){
        debugger
        localStorage.setItem("token", resp.jwt)
        dispatch({type: "SET_CURRENT_USER", payload:user})
      }
    })
  }
}
/*----ACTION CREATORS-----*/

// export const selectUser = (user) => {
//   return {type: 'SELECT_USER', payload:user }
// }
//
// const editUser = (user) => ({type: 'EDIT_USER', payload: user})
