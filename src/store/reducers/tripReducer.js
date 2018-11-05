// only reduces on trips key
const initialState = {currentTrip: null, trips: []}

const tripReducer = (state = initialState, action) =>{
  switch( action.type ){
    case "SET_CURRENT_TRIP":
      return {...state, currentTrip: action.payload}
    case  "ADD_HOTEL_TO_TRIP":
      return {...state, currentTrip: {...state.currentTrip, longitude:action.payload.longitude, latitude:action.payload.latitude, hotels:[action.payload]}}
      case  "ADD_RESTAURANT_TO_TRIP":
        return {...state, currentTrip: {...state.currentTrip, restaurants:[...state.currentTrip.restaurants, action.payload]}}
    default:
      return state
  }
}

export default tripReducer
