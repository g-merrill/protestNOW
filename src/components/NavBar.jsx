import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './css/NavBar.scss';

class NavBar extends Component {

  render() {
    this.navJSX = this.props.user ?
      <>
        <Link
          to='/protests'
          className={`NavBar-link ${this.props.activePage === 'protests' ? 'active' : 'inactive'}`}
          onClick={() => this.props.changeActive('protests')}
        >
          PROTESTS
        </Link>
        &nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
        <Link
          to='/protests/create'
          className={`NavBar-link ${this.props.activePage === 'addprotest' ? 'active' : 'inactive'}`}
          onClick={() => this.props.changeActive('addprotest')}
        >
          ADD PROTEST
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
      </>
      :
      <>
        <Link
          to='/protests'
          className={`NavBar-link ${this.props.activePage === 'protests' ? 'active' : 'inactive'}`}
          onClick={() => this.props.changeActive('protests')}
        >
          PROTESTS
        </Link>
        &nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
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
      </>;
    return (
      <div className='NavBar' id='top'>
        {this.navJSX}
      </div>
    );
  }
}

export default NavBar;
