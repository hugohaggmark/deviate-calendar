import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux'
import createLogger from 'redux-logger'
import { compose, createStore, applyMiddleware } from 'redux'
import { combineReducers } from 'redux'
import persistState from 'redux-localstorage'
import { reducer as CalendarReducer } from './Calendar'
import { reducer as InformationReducer } from './Information'
import App from './App';
import { actions as calendarActions } from './Calendar'
import './index.css'

const middleware = applyMiddleware(createLogger())
const enhancer = compose(
 middleware,
 persistState(),
)
const reducer = combineReducers({
  calendar: CalendarReducer,
  info: InformationReducer,
})
const store = createStore(reducer, {}, enhancer);
//store.dispatch(calendarActions.loadDatesAction(new Date()))
ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);
