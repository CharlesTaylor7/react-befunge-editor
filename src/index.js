import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './components/App';
import { createStore } from 'redux';
import rootReducer from './reducers';
import { Provider } from 'react-redux';

const store = createStore(rootReducer);

const AppWithStore = () => (
  <Provider store={store} >
    <App />
  </Provider>
);

ReactDOM.render(<AppWithStore />, document.getElementById('root'));
