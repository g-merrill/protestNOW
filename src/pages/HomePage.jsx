import React, { Component } from 'react';

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
