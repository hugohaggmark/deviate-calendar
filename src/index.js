import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { Router, Route, browserHistory } from "react-router";
import { routerReducer, syncHistoryWithStore, routerActions, routerMiddleware } from "react-router-redux";
import { UserAuthWrapper } from "redux-auth-wrapper";
import createLogger from "redux-logger";
import { compose, createStore, applyMiddleware } from "redux";
import { combineReducers } from "redux";
import persistState from "redux-localstorage";
import { reducer as CalendarReducer } from "./Calendar";
import { reducer as InformationReducer } from "./Information";
import { reducer as ApplicationReducer } from "./Application";
import App from "./App";
import { actions as calendarActions } from "./Calendar";
import { State, Login, OAuth } from "./Application";
import "./index.css";

const mount = document.getElementById("mount");
const routingMiddleware = routerMiddleware(browserHistory);
const middleware = applyMiddleware(routingMiddleware, createLogger());
const enhancer = compose(middleware, persistState(["info", "calendar"], {}));
const reducer = combineReducers({
  routing: routerReducer,
  calendar: CalendarReducer,
  info: InformationReducer,
  application: ApplicationReducer
});
const store = createStore(reducer, {}, enhancer);
const history = syncHistoryWithStore(browserHistory, store);

try {
  store.dispatch({ type: "Authorize" });
  store.dispatch(calendarActions.loadDatesAction(new Date()));
} catch (err) {
  console.log(err.message);
}

const UserIsAuthenticated = UserAuthWrapper({
  authSelector: state => state.application,
  predicate: application => application && application.id,
  redirectAction: routerActions.replace,
  failureRedirectPath: process.env.PUBLIC_URL + "/login",
  wrapperDisplayName: "UserIsAuthenticated",
  allowRedirectBack: false
});

ReactDOM.render(
  <Provider store={store}>
    <Router history={history}>
      <Route path={"/"} component={UserIsAuthenticated(App)} />
      <Route path={process.env.PUBLIC_URL + "/"} component={UserIsAuthenticated(App)} />
      <Route path={process.env.PUBLIC_URL + "/login"} component={Login} />
      <Route path={process.env.PUBLIC_URL + "/oauth"} component={OAuth} />
      <Route path={"/oauth"} component={OAuth} />
      <Route path={process.env.PUBLIC_URL + "/state"} component={State} />
    </Router>
  </Provider>,
  mount
);

export default store;
