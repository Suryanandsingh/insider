import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import rootReducer from '../Reducers/index';

const initialState = {};
// console.log("root reducer : ", rootReducer);
const store = createStore(
  rootReducer,
  initialState,
  applyMiddleware(thunk)
);

export default store;
