import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { App } from './components/App';
import { createStore } from 'redux';
import rootReducer from './reducers';

const store = createStore(rootReducer);

const App = () => (
  <div>
    <Counter/>
  </div>
);

ReactDOM.render(<App />, document.getElementById('root'));
