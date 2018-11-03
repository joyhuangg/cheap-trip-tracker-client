import { createStore, applyMiddleware, compose } from 'redux'
import thunk from 'redux-thunk'
import rootReducer from './reducers/rootReducer'

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(rootReducer, /* preloadedState, */ composeEnhancers(applyMiddleware(thunk)));

export default store
export * from './actions/tripActions'
export * from './actions/userActions'
export * from './actions/hotelActions'
// can now import {updateTrip} from './store'
