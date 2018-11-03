// only reduces on trips key
const initialState = {currentTrip: null}

const tripReducer = (state = initialState, action) =>{
  switch( action.type ){
    case "SET_CURRENT_TRIP":
      return {...state, currentTrip: action.payload}
    default:
      return state
  }
}

export default tripReducer
