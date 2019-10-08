import React, { Component } from 'react';
import './css/App.css';
import { Route, Switch } from 'react-router-dom';
import NavBar from './NavBar';
import HomePage from './HomePage';
import SignupPage from './SignupPage';
import LoginPage from './LoginPage';
import ProfilePage from './ProfilePage';
import userService from '../utils/userService';
import * as moment from 'moment';

class App extends Component {

  state = {
    user: userService.getUser(),
    users: []
  };

  handleSignupOrLogin = () => {
    this.setState({ user: userService.getUser() });
  }

  handleLogout = () => {
    userService.logout();
    this.setState({ user: null });
  }

  async componentDidMount() {
    const users = await userService.index();
    this.setState({ users })
  }

  render() {
    return (
      <div className="App-ctnr">
        <NavBar
          user={this.state.user}
          handleLogout={this.handleLogout}
        />
        <h1>protestNOW</h1>
        <Switch>
          <Route exact path='/' render={() => (
            <HomePage />
          )}/>
          <Route exact path='/signup' render={({ history }) => (
            <SignupPage
              history={history}
              handleSignupOrLogin={this.handleSignupOrLogin}
            />
          )}/>
          <Route exact path='/login' render={({ history }) => (
            <LoginPage
              history={history}
              handleSignupOrLogin={this.handleSignupOrLogin}
            />
          )}/>
          <Route exact path='/profile' render={() => (
            <ProfilePage
              user={this.state.user}
            />
          )}/>

          {/* REMOVE THIS BEFORE SUBMITTING APP */}
          <Route exact path='/api/v1/users' render={() => (
            this.state.users.map((u, idx) => (
              <>
              <p>{idx + 1}. {u.username} - Created: {moment(u.createdAt).format("dddd, MMMM Do YYYY, h:mm:ss a")}</p>
              <hr />
              </>
            ))
          )}/>
          {/* REMOVE THIS BEFORE SUBMITTING APP */}
        </Switch>
      </div>
    );
  }
}

export default App;
