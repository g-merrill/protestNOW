import React, { Component } from 'react';
import './css/App.css';
import { Route, Switch } from 'react-router-dom';
import NavBar from './NavBar';
import HomePage from './HomePage';
import SignupPage from './SignupPage';
import LoginPage from './LoginPage';

class App extends Component {
  render() {
    return (
      <div className="App-ctnr">
        <NavBar />
        <h1>protestNOW</h1>
        <Switch>
          <Route exact path='/' render={() => (
            <HomePage

            />
          )}/>
          <Route exact path='/signup' render={({ history }) => (
            <SignupPage
              history={history}

            />
          )}/>
          <Route exact path='/login' render={() => (
            <LoginPage

            />
          )}/>
        </Switch>
      </div>
    );
  }
}

export default App;
