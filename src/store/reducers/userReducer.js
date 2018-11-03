// only reduces on user key

const userReducer = (state = {currentUser:null}, action) =>{
  switch( action.type ){
    case "SET_CURRENT_USER":
      return {...state, currentUser: action.payload}
    case "REMOVE_USER":
      return {...state, currentUser:null}
    default:
      return {...state}
  }
}

export default userReducer
