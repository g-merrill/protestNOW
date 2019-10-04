import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './css/SignupPage.css';
import userService from '../utils/userService';

class SignupPage extends Component {
  constructor(props) {
    super(props);
  }

  state = {
    message: '',
    username: '',
    firstName: '',
    lastInitial: '',
    password: '',
    passwordConf: ''
  };

  updateMessage = msg => {
    this.setState({ message: msg });
  }

  handleChange = e => {
    this.updateMessage('');
    this.setState({
      // Using ES2015 Computed Property Names
      [e.target.name]: e.target.value
    });
  }

  handleSubmit = async e => {
    e.preventDefault();
    try {
      let userInputs = {
        username: this.state.username,
        firstName: this.state.firstName,
        lastInitial: this.state.lastInitial,
        password: this.state.password,
        passwordConf: this.state.passwordConf
      };
      await userService.signup(userInputs);
      // Successfully signed up - show GamePage
      this.props.history.push('/');
    } catch (err) {
      // Invalid user data (probably duplicate email)
      this.updateMessage(err.message);
    }
  }

  isFormInvalid() {
    return !(this.state.username && this.state.password === this.state.passwordConf);
  }

  render() {
    return (
      <div className='SignupPage'>
        <div>
          <header className="header-footer">Sign Up</header>
          <form className="form-horizontal" onSubmit={this.handleSubmit} >
            <div className="form-group">
              <div className="col-sm-12">
                <input type="text" className="form-control" placeholder="Username" value={this.state.username} name="username" onChange={this.handleChange} />
              </div>
            </div>
            <div className="form-group">
              <div className="col-sm-12">
                <input type="text" className="form-control" placeholder="First Name (optional)" value={this.state.firstName} name="firstName" onChange={this.handleChange} />
              </div>
            </div>
            <div className="form-group">
              <div className="col-sm-12">
                <input type="text" className="form-control" placeholder="Last Initial (optional)" value={this.state.lastInitial} name="lastInitial" onChange={this.handleChange} />
              </div>
            </div>
            <div className="form-group">
              <div className="col-sm-12">
                <input type="password" className="form-control" placeholder="Password" value={this.state.password} name="password" onChange={this.handleChange} />
              </div>
            </div>
            <div className="form-group">
              <div className="col-sm-12">
                <input type="password" className="form-control" placeholder="Confirm Password" value={this.state.passwordConf} name="passwordConf" onChange={this.handleChange} />
              </div>
            </div>
            <div className="form-group">
              <div className="col-sm-12 text-center">
                <button className="btn btn-default" disabled={this.isFormInvalid()}>Sign Up</button>&nbsp;&nbsp;
                <Link to='/'>Cancel</Link>
              </div>
            </div>
          </form>
        </div>
      </div>
    );
  }
}

export default SignupPage;
