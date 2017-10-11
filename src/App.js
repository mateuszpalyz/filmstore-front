import React, { Component } from 'react';
import {
  BrowserRouter as Router,
  Route,
  Link,
  Redirect,
  withRouter
} from 'react-router-dom';
import { instanceOf } from 'prop-types';
import { withCookies, Cookies, CookiesProvider } from 'react-cookie';
import Login from './Login';
import auth from './auth';
import Protected from './Protected';
import './App.css';

class App extends Component {
  static propTypes = {
    cookies: instanceOf(Cookies).isRequired
  };

  constructor (props) {
    super(props);

    const { cookies } = this.props;
    auth.userToken = cookies.get('userToken');
    auth.userEmail = cookies.get('userEmail');
  }

  render () {
    return (
      <Router>
        <div>
          <PrivateRoute exact path="/" component={Protected} />
          <Route path="/login" component={Login} />
        </div>
      </Router>
    );
  }
}

const PrivateRoute = ({ component: Component, ...rest }) => (
  <Route {...rest} render={props => (
    auth.isAuthenticated() ? (
      <Component {...props}/>
    ) : (
      <Redirect to={{
        pathname: '/login',
        state: { from: props.location }
      }}/>
    )
  )}/>
)

export default withCookies(App);
