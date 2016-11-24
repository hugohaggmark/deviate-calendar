import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux'
import { Router, Route, browserHistory } from 'react-router'
import createLogger from 'redux-logger'
import { compose, createStore, applyMiddleware } from 'redux'
import { combineReducers } from 'redux'
import persistState from 'redux-localstorage'
import { reducer as CalendarReducer } from './Calendar'
import { reducer as InformationReducer } from './Information'
import App from './App';
import { actions as calendarActions } from './Calendar'
import { State } from './Application'
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
try {
  store.dispatch(calendarActions.loadDatesAction(new Date()))
} catch(err) {
  console.log(err.message)
}

ReactDOM.render(
  <Provider store={store}>
    <Router history={browserHistory}>
      <Route path="/" component={App}/>
      <Route path="/state" component={State}/>
    </Router>
  </Provider>,
  document.getElementById('root')
);
