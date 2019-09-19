import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './components/App';
import { createStore } from 'redux';
import rootReducer from './store/reducers';
import { Provider } from 'react-redux';

const store = createStore(
  rootReducer,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

const AppWithStore = () => (
  <Provider store={store} >
    <App />
  </Provider>
);

ReactDOM.render(<AppWithStore />, document.getElementById('root'));
