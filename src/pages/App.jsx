import React, { Component } from 'react';
import './css/App.css';
import { Route, Switch } from 'react-router-dom';
import NavBar from './NavBar';
import HomePage from './HomePage';
import SignupPage from './SignupPage';
import LoginPage from './LoginPage';
import ProfilePage from './ProfilePage';
import ProfileEditPage from './ProfileEditPage';
import ProtestCreatePage from './ProtestCreatePage';
import userService from '../utils/userService';
import ProtestsCtnr from '../components/ProtestsCtnr';
import * as moment from 'moment';
import protestService from '../utils/protestService';
import SingleProtestPage from './SingleProtestPage';
import StoryCreatePage from './StoryCreatePage';

class App extends Component {

  state = {
    user: userService.getUser(),
    users: [],
    protests: [],
    activePage: 'home',
  };

  handleSignupOrLogin = () => {
    let user = userService.getUser();
    this.setState({
      user
    });
  }

  handleLogout = () => {
    userService.logout();
    this.setState({ user: null, activePage: 'home' });
  }

  async componentDidMount() {
    // load anything that might require an async fetch call here
    // load all users (do i remove this before deployment?)
    const users = await userService.index();

    // load protests list
    const protests = await protestService.index();

    // load stories of homepage's selected protest
    this.setState({
      users,
      protests,
    });
  }

  changeActive = page => {
    this.setState({ activePage: page });
  }

  getProtestByID = id => {
    return protestService.getProtestByID(id);
  }

  render() {
    return (
      <div className="App-ctnr">
        <NavBar
          user={ this.state.user }
          activePage={ this.state.activePage }
          handleLogout={ this.handleLogout }
          changeActive={ this.changeActive }
        />
        <h1>protestNOW</h1>
        <Switch>
          <Route exact path='/' render={() => (
            <HomePage
              changeActive={ this.changeActive }
            />
          )}/>
          <Route exact path='/signup' render={({ history }) => (
            <SignupPage
              history={ history }
              handleSignupOrLogin={ this.handleSignupOrLogin }
            />
          )}/>
          <Route exact path='/login' render={({ history }) => (
            <LoginPage
              history={ history }
              handleSignupOrLogin={ this.handleSignupOrLogin }
            />
          )}/>
          <Route exact path='/profile' render={({ history }) => (
            <ProfilePage
              history={ history }
              user={ this.state.user }
            />
          )}/>
          <Route exact path='/profile/edit' render={({ history }) => (
            <ProfileEditPage
              history={ history }
              user={ this.state.user }
              handleChangeUpdate={ this.handleChangeUpdate }
            />
          )}/>
          <Route exact path='/protests' render={({ history }) => (
            <ProtestsCtnr
              history={ history }
              user={ this.state.user }
              protests={ this.state.protests }
            />
          )}/>
          <Route exact path='/protests/create' render={({ history }) => (
            <ProtestCreatePage
              history={ history }
              user={ this.state.user }
            />
          )}/>
          <Route path='/protests/:id/stories/create' render={({ history }) => (
            <StoryCreatePage
              history={ history }
              user={ this.state.user }
            />
          )}/>
          <Route path='/protests/:id' render={props => {
            return (
              <SingleProtestPage
                match={ props.match }
                history={ props.history }
                user={ this.state.user }
                protestID={ props.match.params.id }
                getProtestByID={ this.getProtestByID }
              />
            );
          }}/>
          {/* REMOVE THIS BEFORE SUBMITTING APP */}
          <Route exact path='/api/v1/users' render={() => (
            this.state.users.map((u, idx) => (
              <div key={idx + 1}>
                <p>{idx + 1}. {u.username} - Created: {moment(u.createdAt).format("dddd, MMMM Do YYYY, h:mm:ss a")}</p>
                <hr />
              </div>
            ))
          )}/>
          {/* REMOVE THIS BEFORE SUBMITTING APP */}
        </Switch>
      </div>
    );
  }
}

export default App;
