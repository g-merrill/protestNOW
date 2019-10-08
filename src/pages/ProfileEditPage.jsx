import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './css/ProfileEditPage.css';

class ProfileEditPage extends Component {

  handleSubmit = async e => {
    e.preventDefault();

  }

  render() {
    return (
      <div className='ProfileEditPage'>
        <h3>Edit Profile</h3>
        <form id="edit-form" className="form-horizontal" onSubmit={this.handleSubmit}>
          <div className="form-group">
            <div className="col-sm-12">
              <label htmlFor="username">Username</label>
              <input id="username" type="text" className="form-control" placeholder={this.props.user.username} name="username" onChange={this.handleChangeUpdate} />
            </div>
          </div>
          <div className="form-group">
            <div className="col-sm-12">
              <label htmlFor="firstName">First Name (optional)</label>
              <input id="firstName" type="text" className="form-control" placeholder={this.props.user.firstName} name="firstName" onChange={this.handleChangeUpdate} />
            </div>
          </div>
          <div className="form-group">
            <div className="col-sm-12">
              <label htmlFor="lastInitial">Last Initial (optional)</label>
              <input id="lastInitial" type="text" className="form-control" placeholder={this.props.user.lastInitial} name="lastInitial" onChange={this.handleChangeUpdate} />
            </div>
          </div>
          <div className="form-group">
            <div className="col-sm-12">
              <label htmlFor="password">Password</label>
              <input id="password" type="password" className="form-control" placeholder="New Password" name="password" onChange={this.handleChangeUpdate} />
            </div>
          </div>
          <div className="form-group">
            <div className="col-sm-12">
              <input type="password" className="form-control" placeholder="Confirm Password" name="passwordConf" />
            </div>
          </div>
        </form>
        <button type="submit" className="btn btn-default save-btn" form="edit-form">Save Profile</button>
        <Link to="/profile" className="btn btn-default cancel-btn">Cancel</Link>
      </div>
    );
  }
}

export default ProfileEditPage;
