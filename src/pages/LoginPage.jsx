import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './css/LoginPage.scss';
import userService from '../utils/userService';

class LoginPage extends Component {

  state = {
    username: '',
    pw: ''
  };

  handleChange = e => {
    this.setState({
      // Using ES2015 Computed Property Names
      [e.target.name]: e.target.value
    });
  }

  handleSubmit = async e => {
    e.preventDefault();
    try {
      await userService.login(this.state);
      this.props.handleSignupOrLogin();
      // Successfully signed up - show GamePage
      this.props.history.push('/protests');
    } catch (err) {
      // Invalid user data (probably duplicate username)
      console.log('bad credentials');
    }
  }

  render() {
    return (
      <div className="LoginPage">
        <div className='fader-top'></div>
        <h3 className="login-header">Log In</h3>
        <form className="form-horizontal login-form" onSubmit={this.handleSubmit} >
          <div className="form-group input-ctnr-div">
            <p className='input-label'>Username&nbsp;&nbsp;=>&nbsp;&nbsp;</p>
            <div>
              <input type="text" className="form-control" placeholder="Username" value={this.state.username} name="username" onChange={this.handleChange} />
            </div>
          </div>
          <div className="form-group input-ctnr-div">
            <p className='input-label'>Password&nbsp;&nbsp;=>&nbsp;&nbsp;</p>
            <div>
              <input type="password" className="form-control" placeholder="Password" value={this.state.pw} name="pw" onChange={this.handleChange} />
            </div>
          </div>
          <div className="form-group">
            <div className="login-btn-row">
              <button className="btn btn-default login-btn">Log In</button>&nbsp;&nbsp;&nbsp;
              <Link to='/' className='cancel-btn'>Cancel</Link>
            </div>
          </div>
        </form>
        <div className='fader-bottom'></div>
      </div>
    );
  }
}

export default LoginPage;
