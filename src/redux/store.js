import {
  legacy_createStore,
  applyMiddleware,
  combineReducers,
  compose,
} from "redux";

import { AuthenticationReducer } from "./authentication/reducer";
import sprintReducer from "./sprint/reducer";
import taskReducer from "./task/reducer";
import thunk from "redux-thunk";

const rootReducer = combineReducers({
  AuthenticationReducer,
  sprintReducer,
  taskReducer,
});

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
//const composeEnhancers = compose;
export const store = legacy_createStore(
  rootReducer,
  composeEnhancers(applyMiddleware(thunk))
);
