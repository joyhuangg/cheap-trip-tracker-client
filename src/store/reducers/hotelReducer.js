// only reduces on hotels key
const initialState = {hotels: null, selectedHotel: null}

const hotelReducer = (state = initialState, action) =>{
  switch( action.type ){
    case "LOAD_HOTELS":
      return {...state, hotels: action.payload}
    case "SELECT_HOTEL":
      return {...state, selectedHotel: action.payload}
    case "REMOVE_HOTELS":
      return {hotels: null, selectedHotel: null}
    default:
      return state
  }
}

export default hotelReducer
