import React, { Component } from 'react';
import './css/App.scss';
import { Route, Switch, Redirect } from 'react-router-dom';
import NavBar from '../components/NavBar';
import SignupPage from './SignupPage';
import LoginPage from './LoginPage';
import ProfilePage from './ProfilePage';
import ProfileEditPage from './ProfileEditPage';
import ProtestCreatePage from './ProtestCreatePage';
import userService from '../utils/userService';
import ProtestsIndexPage from './ProtestsIndexPage';
import * as moment from 'moment';
import protestService from '../utils/protestService';
import SingleProtestPage from './SingleProtestPage';
import StoryCreatePage from './StoryCreatePage';
import StoryUpdatePage from './StoryUpdatePage';

class App extends Component {

  state = {
    userFromToken: userService.getUser(),
    users: [],
    protests: [],
    activePage: 'protests',
  };

  handleSignupOrLogin = () => {
    let userFromToken = userService.getUser();
    this.setState({
      userFromToken,
      activePage: 'protests'
    });
  }

  handleLogout = () => {
    userService.logout();
    this.setState({ userFromToken: null, activePage: 'protests' });
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

  addProtestToState = protest => {
    let protests = [...this.state.protests];
    protests.push(protest);
    this.setState({ protests });
  }

  updateStoriesForProtest = async () => {
    const protests = await protestService.index();
    this.setState({ protests });
  }

  render() {
    return (
      <div className="App">
        <NavBar
          user={ this.state.userFromToken }
          activePage={ this.state.activePage }
          handleLogout={ this.handleLogout }
          changeActive={ this.changeActive }
        />
        <h1 className='protestNOW-text'>protest<span className='now-text'>NOW</span></h1>
        <Switch>
          <Route exact path='/' render={() => (
            <Redirect to='/protests' />
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
              user={ this.state.userFromToken }
            />
          )}/>
          <Route exact path='/profile/edit' render={({ history }) => (
            <ProfileEditPage
              history={ history }
              user={ this.state.userFromToken }
              handleChangeUpdate={ this.handleChangeUpdate }
            />
          )}/>
          <Route exact path='/protests' render={({ history }) => (
            <ProtestsIndexPage
              history={ history }
              user={ this.state.userFromToken }
              protests={ this.state.protests }
            />
          )}/>
          <Route exact path='/protests/create' render={({ history }) => (
            <ProtestCreatePage
              history={ history }
              user={ this.state.userFromToken }
              addProtestToState= { this.addProtestToState }
            />
          )}/>
          <Route path='/protests/:id/stories/create' render={props => (
            <StoryCreatePage
              history={ props.history }
              user={ this.state.userFromToken }
              protestID={ props.match.params.id }
              updateStoriesForProtest={this.updateStoriesForProtest}
            />
          )}/>
          <Route path='/protests/:protest_id/stories/:story_id/update' render={props => (
            <StoryUpdatePage
              history={ props.history }
              user={ this.state.userFromToken }
              protestID={ props.match.params.protest_id }
              storyID={ props.match.params.story_id }
            />
          )}/>
          <Route path='/protests/:id' render={props => {
            return (
              <SingleProtestPage
                match={ props.match }
                history={ props.history }
                user={ this.state.userFromToken }
                protestID={ props.match.params.id }
                getProtestByID={ this.getProtestByID }
                updateStoriesForProtest={ this.updateStoriesForProtest }
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
