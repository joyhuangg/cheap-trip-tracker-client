import { combineReducers } from 'redux'
import  tripReducer  from './tripReducer'
import userReducer from './userReducer'
import hotelReducer from './hotelReducer'

const rootReducer = combineReducers({
  trips: tripReducer,
  currentUser: userReducer,
  hotels: hotelReducer
  // tripReducer
  // selectedTrip: selectedTripReducer
})

export default rootReducer
