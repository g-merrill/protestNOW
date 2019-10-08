import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './css/NavBar.css';

class NavBar extends Component {

  state = {
    active: 'home'
  }

  changeActive = page => {
    this.setState({ active: page });
  }

  render() {
    this.navJSX = this.props.user ?
      <div>
        <Link
          to='/'
          className={`NavBar-link ${this.state.active === 'home' ? 'active' : ''}`}
          onClick={() => this.changeActive('home')}
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
          className={`NavBar-link ${this.state.active === 'profile' ? 'active' : ''}`}
          onClick={() => this.changeActive('profile')}
        >
          PROFILE
        </Link>
      </div>
      :
      <div>
        <Link
          to='/'
          className={`NavBar-link ${this.state.active === 'home' ? 'active' : ''}`}
          onClick={() => this.changeActive('home')}
        >
          HOME
        </Link>
        &nbsp;&nbsp;|&nbsp;&nbsp;
        <Link
          to='/login'
          className={`NavBar-link ${this.state.active === 'login' ? 'active' : ''}`}
          onClick={() => this.changeActive('login')}
        >
          LOG IN
        </Link>
        &nbsp;&nbsp;|&nbsp;&nbsp;
        <Link
          to='/signup'
          className={`NavBar-link ${this.state.active === 'signup' ? 'active' : ''}`}
          onClick={() => this.changeActive('signup')}
        >
          SIGN UP
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
