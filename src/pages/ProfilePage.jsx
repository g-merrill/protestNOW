import React from 'react';
import { Link } from 'react-router-dom';
import './css/ProfilePage.css';

const ProfilePage = props => (
  <div className='ProfilePage'>
    <h3>Profile Details</h3>
    <div className="data-ctnr">
      <label className="data-left" htmlFor="username">Username:</label>
      <p id="username" className="data-right">{props.user.username}</p>
    </div>
    <div className="data-ctnr">
      <label className="data-left" htmlFor="firstName">First Name (optional):</label>
      <p id="firstName" className="data-right">{props.user.firstName}</p>
    </div>
    <div className="data-ctnr">
      <label className="data-left" htmlFor="lastInitial">Last Initial (optional):</label>
      <p id="lastInitial" className="data-right">{props.user.lastInitial}</p>
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
);

export default ProfilePage;
