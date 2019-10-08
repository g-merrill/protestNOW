import React, { Component } from 'react';
import './css/App.css';
import { Route, Switch } from 'react-router-dom';
import NavBar from './NavBar';
import HomePage from './HomePage';
import SignupPage from './SignupPage';
import LoginPage from './LoginPage';
import ProfilePage from './ProfilePage';
import ProfileEditPage from './ProfileEditPage';
import userService from '../utils/userService';
import * as moment from 'moment';

class App extends Component {

  state = {
    user: userService.getUser(),
    username: '',
    firstName: '',
    lastInitial: '',
    password: '',
    passwordConf: '',
    users: [],
    activePage: 'home'
  };

  handleSignupOrLogin = () => {
    let user = userService.getUser();
    this.setState({
      user,
      username: user.username,
      firstName: user.firstName,
      lastInitial: user.lastInitial
    });
  }

  handleLogout = () => {
    userService.logout();
    this.setState({ user: null, activePage: 'home' });
  }

  async componentDidMount() {
    // load anything that might require an async fetch call here
    // load user data if this.state.user is not null
    let username, firstName, lastInitial;
    if (this.state.user) {
      username = this.state.user.username;
      firstName = this.state.user.firstName;
      lastInitial = this.state.user.lastInitial;
    } else {
      username = '';
      firstName = '';
      lastInitial = '';
    }
    // load all users (do i remove this before deployment?)
    const users = await userService.index();
    // load protests list
    // load stories of homepage's selected protest
    this.setState({
      username,
      firstName,
      lastInitial,
      users
    });
  }

  changeActive = page => {
    this.setState({ activePage: page });
  }

  render() {
    return (
      <div className="App-ctnr">
        <NavBar
          user={this.state.user}
          activePage={this.state.activePage}
          handleLogout={this.handleLogout}
          changeActive={this.changeActive}
        />
        <h1>protestNOW</h1>
        <Switch>
          <Route exact path='/' render={() => (
            <HomePage
              changeActive={this.changeActive}
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
          <Route exact path='/profile' render={({ history }) => (
            <ProfilePage
              history={ history }
              user={this.state.user}
            />
          )}/>
          <Route exact path='/profile/edit' render={({ history }) => (
            <ProfileEditPage
              history={ history }
              user={this.state.user}
              handleChangeUpdate={this.handleChangeUpdate}
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
