// only reduces on trips key
const initialState = {currentTrip: null}

const tripReducer = (state = initialState, action) =>{
  switch( action.type ){
    case "SET_CURRENT_TRIP":
      return {...state, currentTrip: action.payload}
    case  "ADD_HOTEL_TO_TRIP":
      return {...state, currentTrip: {...state.currentTrip, longitude:action.payload.hotel.longitude, latitude:action.payload.hotel.latitude, hotels:[action.payload.hotel]}}
      case  "ADD_RESTAURANT_TO_TRIP":
        return {...state, currentTrip: {...state.currentTrip, restaurants:[...state.currentTrip.restaurants, action.payload.restaurant]}}
    default:
      return state
  }
}

export default tripReducer
