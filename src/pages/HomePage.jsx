import React, { Component } from 'react';
import './css/HomePage.css';

class HomePage extends Component {

  componentDidMount() {
    this.props.changeActive('home');
  }

  render() {
    return (
      <div>HomePage</div>
    );
  }
}

export default HomePage;
