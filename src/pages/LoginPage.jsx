import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './css/LoginPage.css';
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
      console.log('about to enter the fetch statemnt in userService login function:');
      await userService.login(this.state);
      console.log('got past the await: ');
      this.props.handleSignupOrLogin();
      // Successfully signed up - show GamePage
      this.props.history.push('/');
      console.log('worked!');
    } catch (err) {
      // Invalid user data (probably duplicate email)
      console.log('Invalid Credentials!');
      console.log('Did not work!');
    }
  }

  render() {
    return (
      <div className="LoginPage">
        <header className="header-footer">Log In</header>
        <form className="form-horizontal" onSubmit={this.handleSubmit} >
          <div className="form-group">
            <div className="col-sm-12">
              <input type="text" className="form-control" placeholder="Username" value={this.state.username} name="username" onChange={this.handleChange} />
            </div>
          </div>
          <div className="form-group">
            <div className="col-sm-12">
              <input type="password" className="form-control" placeholder="Password" value={this.state.pw} name="pw" onChange={this.handleChange} />
            </div>
          </div>
          <div className="form-group">
            <div className="col-sm-12 text-center">
              <button className="btn btn-default">Log In</button>&nbsp;&nbsp;&nbsp;
              <Link to='/'>Cancel</Link>
            </div>
          </div>
        </form>
      </div>
    );
  }
}

export default LoginPage;
