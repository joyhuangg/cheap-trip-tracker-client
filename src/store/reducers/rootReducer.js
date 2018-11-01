import { combineReducers } from 'redux'
import  tripReducer  from './tripReducer'
import userReducer from './userReducer'

const rootReducer = combineReducers({
  trips: tripReducer,
  currentUser: userReducer
  // tripReducer
  // selectedTrip: selectedTripReducer
})

export default rootReducer
