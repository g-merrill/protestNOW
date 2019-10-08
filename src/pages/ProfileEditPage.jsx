import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './css/ProfileEditPage.css';

class ProfileEditPage extends Component {

  handleEditProfile = async e => {
    e.preventDefault();

    // get old user properties from state

    // compare to new input values
      // for passwords, only change if there is something valid in passwords inputs

    // if there are differences, overwrite the old values with the new

    // save the updated user in db

    // update state & token stuff in app.jsx
  }

  render() {
    return (
      <div className='ProfileEditPage'>
        <h3>Edit Profile</h3>
        <form id="edit-form" className="form-horizontal" onSubmit={this.handleEditProfile}>
          <div className="form-group">
            <div className="col-sm-12">
              <label htmlFor="username">Username</label>
              <input id="username" type="text" className="form-control" placeholder={this.props.user.username} name="username"/>
            </div>
          </div>
          <div className="form-group">
            <div className="col-sm-12">
              <label htmlFor="firstName">First Name (optional)</label>
              <input id="firstName" type="text" className="form-control" placeholder={this.props.user.firstName} name="firstName"/>
            </div>
          </div>
          <div className="form-group">
            <div className="col-sm-12">
              <label htmlFor="lastInitial">Last Initial (optional)</label>
              <input id="lastInitial" type="text" className="form-control" placeholder={this.props.user.lastInitial} name="lastInitial"/>
            </div>
          </div>
          <div className="form-group">
            <div className="col-sm-12">
              <label htmlFor="password">Password</label>
              <input id="password" type="password" className="form-control" placeholder="New Password" name="password"/>
            </div>
          </div>
          <div className="form-group">
            <div className="col-sm-12">
              <input type="password" className="form-control" placeholder="Confirm Password" name="passwordConf" />
            </div>
          </div>
        </form>
        <Link to="/profile" className="btn btn-default save-btn">Save Profile</Link>
        {/* <button type="submit" className="btn btn-default save-btn" form="edit-form">Save Profile</button> */}
        <Link to="/profile" className="btn btn-default cancel-btn">Cancel</Link>
      </div>
    );
  }
}

export default ProfileEditPage;
