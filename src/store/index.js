import { createStore, applyMiddleware } from 'redux';
import * as R from 'ramda'

import rootReducer from './reducers';
import defaultState from './defaultState';

const logger = store => next => action => {
  console.log('dispatching', action)
  let result = next(action)
  console.log('next state', store.getState())
  return result
}

export default (initialState) => createStore(
  rootReducer,
  R.mergeRight(
    R.mergeRight(defaultState, initialState),
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()),
  applyMiddleware(logger)
);
