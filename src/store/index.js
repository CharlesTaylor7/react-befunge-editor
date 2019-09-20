import { createStore } from 'redux';
import * as R from 'ramda'

import rootReducer from './reducers';
import defaultState from './defaultState';

export default (initialState) => createStore(
  rootReducer,
  R.mergeRight(
    R.mergeRight(defaultState, initialState),
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__())
);
