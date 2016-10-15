import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux'
import createLogger from 'redux-logger'
import { createStore, applyMiddleware } from 'redux'
import { combineReducers } from 'redux'
import CalendarReducer from './reducers/calendar'
import InfoReducer from './reducers/info'
import App from './App';
import './index.css';

const middleware = applyMiddleware(createLogger())
const reducer = combineReducers({
  calendar: CalendarReducer,
  info: InfoReducer,
})
const store = createStore(reducer, {}, middleware);
store.dispatch({ type:'INIT_DATES', payload:{ date: new Date() }})
store.dispatch({ type:'COLLEAGUE_CHANGED', payload:{ colleague: 'Hugo Häggmark' }})
store.dispatch({ type:'CUSTOMER_CHANGED', payload:{ customer: 'TUI Nordic' }})
store.dispatch({ type:'ACCOUNT_CHANGED', payload:{ account: 'Team Customer' }})
store.dispatch({ type:'PRICERATE_CHANGED', payload:{ pricerate: 900 }})
store.dispatch({type:'REPORT_VAB', payload:{date: new Date(2016, 9, 7)}})
store.dispatch({type:'REPORT_SICKNESS', payload:{date: new Date(2016, 9, 14)}})
store.dispatch({type:'REPORT_VACATION', payload:{date: new Date(2016, 9, 5)}})
ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);
