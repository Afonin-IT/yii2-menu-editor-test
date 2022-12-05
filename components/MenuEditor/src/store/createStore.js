import {applyMiddleware, combineReducers, compose} from "redux";
import {createStore as createReduxStore} from "redux";
import thunk from "redux-thunk";
import {menuReducer} from "./menu";
import axiosMiddleware from "redux-axios-middleware";
import axiosClient from "./common/axios";

const composeEnhancers =
  (process.env.REACT_APP_MODE !== 'production' &&
    typeof window !== 'undefined' &&
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) ||
  compose;

export const createStore = (initialState) => {
  const store = createReduxStore(
    combineReducers({menu: menuReducer}),
    initialState,
    composeEnhancers(applyMiddleware(thunk, axiosMiddleware(axiosClient))),
  );

  return store;
};
