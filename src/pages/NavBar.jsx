import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './css/NavBar.css';

class NavBar extends Component {

  render() {
    this.navJSX = this.props.user ?
      <div id="top">
        <Link
          to='/'
          className={`NavBar-link ${this.props.activePage === 'home' ? 'active' : 'inactive'}`}
          onClick={() => this.props.changeActive('home')}
        >
          HOME
        </Link>
        &nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
        <Link
          to=''
          className='NavBar-link'
          onClick={this.props.handleLogout}
        >
          LOG OUT
        </Link>
        &nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
        <Link
          to='/profile'
          className={`NavBar-link ${this.props.activePage === 'profile' ? 'active' : 'inactive'}`}
          onClick={() => this.props.changeActive('profile')}
        >
          PROFILE
        </Link>
        &nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
        <Link
          to='/protests'
          className='NavBar-link'
        >
          PROTESTS
        </Link>
        &nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
        <Link
          to='/protests/create'
          className='NavBar-link'
        >
          ADD PROTEST
        </Link>
      </div>
      :
      <div id="top">
        <Link
          to='/'
          className={`NavBar-link ${this.props.activePage === 'home' ? 'active' : 'inactive'}`}
          onClick={() => this.props.changeActive('home')}
        >
          HOME
        </Link>
        &nbsp;&nbsp;|&nbsp;&nbsp;
        <Link
          to='/login'
          className={`NavBar-link ${this.props.activePage === 'login' ? 'active' : 'inactive'}`}
          onClick={() => this.props.changeActive('login')}
        >
          LOG IN
        </Link>
        &nbsp;&nbsp;|&nbsp;&nbsp;
        <Link
          to='/signup'
          className={`NavBar-link ${this.props.activePage === 'signup' ? 'active' : 'inactive'}`}
          onClick={() => this.props.changeActive('signup')}
        >
          SIGN UP
        </Link>
        &nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
        <Link
          to='/protests'
          className='NavBar-link'
        >
          PROTESTS
        </Link>
      </div>;
    return (
      <div className='NavBar'>
        {this.navJSX}
      </div>
    );
  }
}

export default NavBar;
