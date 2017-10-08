import React, { Component } from 'react';
import {
  BrowserRouter as Router,
  Route,
  Link,
  Redirect,
  withRouter
} from 'react-router-dom';
import Login from './Login';
import fakeAuth from './fakeAuth';
import AuthButton from './AuthButton';
import './App.css';

const App = () => (
  <Router>
    <div>
      <PrivateRoute exact path="/" component={Protected}/>
      <Route path="/public" component={Public}/>
      <Route path="/login" component={Login}/>
    </div>
  </Router>
)

const PrivateRoute = ({ component: Component, ...rest }) => (
  <Route {...rest} render={props => (
    fakeAuth.isAuthenticated ? (
      <Component {...props}/>
    ) : (
      <Redirect to={{
        pathname: '/login',
        state: { from: props.location }
      }}/>
    )
  )}/>
)

const Public = () => <h3>Public</h3>
const Protected = () => <div><AuthButton/><h3>Protected</h3></div>

export default App;
