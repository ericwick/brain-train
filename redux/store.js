import { createStore, applyMiddleware, combineReducers} from "redux";
import promiseMiddleware from "redux-promise-middleware";
import reducer from "./reducer";
import game from './game'; 

//middlewares
const middlewares = applyMiddleware(promiseMiddleware());

//multiple Reducers
const multipleReducers = combineReducers({
  reducer: reducer,
  MemoryTiles: game
});

// store with reducers and middlewares
const store = createStore(multipleReducers, middlewares);

export default store;
