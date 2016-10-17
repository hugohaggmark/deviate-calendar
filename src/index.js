import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux'
import createLogger from 'redux-logger'
import { compose, createStore, applyMiddleware } from 'redux'
import { combineReducers } from 'redux'
import persistState from 'redux-localstorage'
import CalendarReducer from './reducers/calendar'
import InfoReducer from './reducers/info'
import App from './App';
import './index.css';

const middleware = applyMiddleware(createLogger())
const enhancer = compose(
 middleware,
 persistState(),
)
const reducer = combineReducers({
  calendar: CalendarReducer,
  info: InfoReducer,
})
const store = createStore(reducer, {}, enhancer);
store.dispatch({ type:'INIT_DATES', payload:{ date: new Date() }})
ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);
