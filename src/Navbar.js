import React from 'react';
import auth from './auth';
import LogoutButton from './LogoutButton';

const Navbar = () =>
  <nav className="navbar nav-palette-2">
    <div className="container">
      <div className="navbar-header">
        <a className="navbar-brand nav-brand-palette-2" href="#">FilmStore</a>
      </div>
      <div className="collapse navbar-collapse">
        <ul className="nav navbar-nav navbar-right">
          <li className="nav-user">Logged in as {auth.userEmail}</li>
          <li><LogoutButton/></li>
        </ul>
      </div>
    </div>
  </nav>

export default Navbar;
