import { createStore, applyMiddleware } from "redux";
import promiseMiddleware from "redux-promise-middleware";
import reducer from "./reducer";

//middlewares
const middlewares = applyMiddleware(promiseMiddleware());

// store with reducers and middlewares
const store = createStore(reducer, middlewares);

export default store;