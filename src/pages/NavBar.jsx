import React from 'react';
import { Link } from 'react-router-dom';
import './css/NavBar.css';

const NavBar = props => {
  return (
    <div>
      <Link to="/" className='NavBar-link'>HOME</Link>
      &nbsp;&nbsp;|&nbsp;&nbsp;
      <Link to="/login" className='NavBar-link'>LOG IN</Link>
      &nbsp;&nbsp;|&nbsp;&nbsp;
      <Link to="/signup" className='NavBar-link'>SIGN UP</Link>
    </div>
  );
}

export default NavBar;
