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
import LogoutButton from './LogoutButton';
import './App.css';

class App extends Component {
  static propTypes = {
    cookies: instanceOf(Cookies).isRequired
  };

  constructor (props) {
    super(props);

    const { cookies } = this.props;
    auth.userToken = cookies.get('userToken');
  }

  render () {
    return (
      <Router>
        <div>
          <PrivateRoute exact path="/" component={Protected} />
          <Route path="/public" component={Public} />
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

const Public = () => <h3>Public</h3>
const Protected = () => <div><LogoutButton/><h3>Protected</h3></div>

export default withCookies(App);
