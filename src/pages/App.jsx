import React, { Component } from 'react';
import './css/App.css';
import { Route, Switch } from 'react-router-dom';
import NavBar from './NavBar';
import HomePage from './HomePage';
import SignupPage from './SignupPage';
import LoginPage from './LoginPage';
import userService from '../utils/userService';

class App extends Component {

  state = {
    user: userService.getUser()
  };

  handleSignupOrLogin = () => {
    this.setState({ user: userService.getUser() });
  }

  handleLogout = () => {
    userService.logout();
    this.setState({ user: null });
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
            <HomePage

            />
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
        </Switch>
      </div>
    );
  }
}

export default App;
