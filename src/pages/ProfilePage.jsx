import React, { Component } from 'react';
import { Route, Switch, Link } from 'react-router-dom';
import './css/ProfilePage.css';
import userService from '../utils/userService';

class ProfilePage extends Component {

  render() {
    return (
      <div className='ProfilePage'>
        <div className="data-ctnr">
          <label className="data-left" htmlFor="username">Username:</label>
          <p id="username" className="data-right">{this.props.user.username}</p>
        </div>
        <div className="data-ctnr">
          <label className="data-left" htmlFor="firstName">First Name (optional):</label>
          <p id="firstName" className="data-right">{this.props.user.firstName}</p>
        </div>
        <div className="data-ctnr">
          <label className="data-left" htmlFor="lastInitial">Last Initial (optional):</label>
          <p id="lastInitial" className="data-right">{this.props.user.lastInitial}</p>
        </div>
        <div className="col-sm-12 text-center">
          <Link
            to="/profile/edit"
            className="btn btn-default"
          >
            Edit Profile
          </Link>
        </div>
      </div>
    );
  }
}

export default ProfilePage;
