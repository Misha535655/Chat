import { createStore, applyMiddleware, combineReducers } from "redux";
import { promiseReducer, authReducer, feedReducer } from "./reducers";
import thunk from "redux-thunk";

const combinedReducers = combineReducers({
  promise: promiseReducer,
  auth: authReducer,
  scroll: feedReducer,
});

const store = createStore(combinedReducers, applyMiddleware(thunk));
export default store;
