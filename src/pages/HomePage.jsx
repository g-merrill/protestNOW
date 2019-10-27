import React, { Component } from 'react';

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
