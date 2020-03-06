import { createStore, applyMiddleware, compose } from "redux";
import reducers from "./reducer";
import ReduxThunk from "redux-thunk";
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const enhancer = composeEnhancers(applyMiddleware(ReduxThunk));
const store = createStore(reducers, enhancer);
export default store;
