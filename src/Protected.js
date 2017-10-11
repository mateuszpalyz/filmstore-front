import React from 'react';
import auth from './auth';
import Navbar from './Navbar';

const Protected = () =>
  <div>
    <Navbar />
    <div><h3>{auth.userEmail}</h3></div>
  </div>

export default Protected;
