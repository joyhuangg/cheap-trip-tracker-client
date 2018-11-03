// only reduces on hotels key
const initialState = {hotels: null, selectedHotel: null}

const tripReducer = (state = initialState, action) =>{
  switch( action.type ){
    case "LOAD_HOTELS":
      return {...state, hotels: action.payload}
    default:
      return state
  }
}

export default tripReducer
