import React, { Component } from 'react';
import './css/HomePage.css';

class HomePage extends Component {

  componentDidMount() {
    this.props.changeActive('home');
  }

  render() {
    return (
      <div className="HomePage">HomePage</div>
    );
  }
}

export default HomePage;
