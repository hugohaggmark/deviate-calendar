import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux'
import { Router, Route, browserHistory } from 'react-router'
import { routerReducer, syncHistoryWithStore, routerActions, routerMiddleware } from 'react-router-redux'
import { UserAuthWrapper } from 'redux-auth-wrapper'
import createLogger from 'redux-logger'
import { compose, createStore, applyMiddleware } from 'redux'
import { combineReducers } from 'redux'
import persistState from 'redux-localstorage'
import { reducer as CalendarReducer } from './Calendar'
import { reducer as InformationReducer } from './Information'
import { reducer as ApplicationReducer } from './Application'
import App from './App';
import { actions as calendarActions } from './Calendar'
import { actions as ApplicationActions} from './Application'
import { State, Login, OAuth, Settings } from './Application'
import './index.css'

const routingMiddleware = routerMiddleware(browserHistory)
const middleware = applyMiddleware(routingMiddleware, createLogger())
const enhancer = compose(
 middleware,
 persistState(['info', 'calendar'], {}),
)
const reducer = combineReducers({
  routing: routerReducer,
  calendar: CalendarReducer,
  info: InformationReducer,
  application: ApplicationReducer,
})
const store = createStore(reducer, {}, enhancer);
const history = syncHistoryWithStore(browserHistory, store)

try {
  store.dispatch(ApplicationActions.authorizeAction())
  store.dispatch(ApplicationActions.loadDeviationsAction())
  store.dispatch(calendarActions.loadDatesAction(new Date()))
} catch(err) {
  console.log(err.message)
}

const UserIsAuthenticated = UserAuthWrapper({
  authSelector: state => state.application,
  predicate: application => application && application.id,
  redirectAction: routerActions.replace,
  failureRedirectPath: '/login',
  wrapperDisplayName: 'UserIsAuthenticated',
  allowRedirectBack: false
})

ReactDOM.render(
  <Provider store={store}>
    <Router history={history}>
      <Route path="/" component={UserIsAuthenticated(App)}/>
      <Route path="login" component={Login}/>
      <Route path="oauth" component={OAuth}/>
      <Route path="state" component={State}/>
      <Route path="settings" component={Settings}/>
    </Router>
  </Provider>,
  document.getElementById('mount')
);

export default store
