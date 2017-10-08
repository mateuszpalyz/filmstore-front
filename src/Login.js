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
      <div className="form-wrapper">
        <div className="panel panel-default form-container">
          <div className="panel-heading heading-palette-2">FilmStore</div>
          <div className="panel-body form-body">
            <form onSubmit={this.onSubmit}>
              <div className="form-group">
                <input
                  className="form-control"
                  type="text"
                  placeholder="Email"
                  ref={ node => { this.email_input = node; }}
                />
              </div>
              <div className="form-group">
                <input
                  className="form-control"
                  type="password"
                  placeholder="Password"
                  ref={ node => { this.password_input = node; }}
                />
              </div>
              <button type="submit" className="btn btn-palette-1 pull-right">Login</button>
            </form>
          </div>
        </div>
      </div>
    )
  }
}

export default withCookies(Login);
