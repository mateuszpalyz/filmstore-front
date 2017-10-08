import React, { Component } from 'react';
import {
  BrowserRouter as Router,
  Route,
  Link,
  Redirect,
  withRouter
} from 'react-router-dom';
import { instanceOf } from 'prop-types';
import { withCookies, Cookies } from 'react-cookie';
import auth from './auth';
import AuthButton from './AuthButton';

class Login extends Component {
  static propTypes = {
    cookies: instanceOf(Cookies).isRequired
  };

  constructor (props) {
    super(props);

    this.onSubmit = this.onSubmit.bind(this);
  }

  state = {
    redirectToReferrer: false
  }

  onSubmit = (e) => {
    e.preventDefault();
    auth.authenticate({
      email: this.email_input.value,
      password: this.password_input.value,
      callback: (userToken) => {
        this.setState({ redirectToReferrer: true });
        this.props.cookies.set('userToken', userToken);
      }
    });
  }

  render() {
    if (auth.isAuthenticated()) { return <Redirect to='/' /> }

    const { from } = this.props.location.state || { from: { pathname: '/' } }
    const { redirectToReferrer } = this.state

    if (redirectToReferrer) { return <Redirect to={from} /> }

    return (
      <div>
        <AuthButton/>
        <p>You must log in to view the page at {from.pathname}</p>
        <form onSubmit={this.onSubmit}>
          <label>Email</label>
          <input
            type="text"
            ref={ node => { this.email_input = node; }}
          />
          <label>Password</label>
          <input
            type="text"
            ref={ node => { this.password_input = node; }}
          />
          <button type="submit">Login</button>
        </form>
      </div>
    )
  }
}

export default withCookies(Login);
