import React, { Component } from 'react';
import { Route, Switch, Link } from 'react-router-dom';
import './css/ProfilePage.css';
import userService from '../utils/userService';

class ProfilePage extends Component {

  render() {
    return (
      <Switch>
        <Route exact path='/profile' render={() => (
          <div className='ProfilePage'>
            <h3>Profile Details</h3>
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
                className="btn btn-default edit-btn"
              >
                Edit Profile
              </Link>
            </div>
          </div>
        )}/>
        <Route exact path='/profile/edit' render={() => (
          <div className='ProfilePage'>

          </div>
        )}/>
      </Switch>
    );
  }
}

export default ProfilePage;
