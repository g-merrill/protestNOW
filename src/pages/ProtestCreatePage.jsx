import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './css/ProtestCreatePage.css';

class ProtestCreatePage extends Component {

  state = {
    name: '',
    date: new Date(),
    city: '',
    location: '',
    creator: this.props.user.username,
    keywords: []
  };

  handleChange = e => {
    this.setState({
      // Using ES2015 Computed Property Names
      [e.target.name]: e.target.value
    });
  }

  handleKeywords = () => {

  }

  handleDate = () => {

  }

  handleSubmit = e => {
    console.log(this.state);
    this.props.history.push('/');
  }

  render() {
    return (
      <div className='ProtestCreatePage'>
        <div>
          <header className="header-footer">Protest Details</header>
          <form className="form-horizontal" onSubmit={this.handleSubmit} >
            <div className="form-group">
              <div className="col-sm-12">
                <input type="text" className="form-control" placeholder="Protest Name" value={this.state.name} name="name" onChange={this.handleChange} />
              </div>
            </div>
            <div className="form-group">
              <div className="col-sm-12">
                <input type="text" className="form-control" placeholder="City" value={this.state.city} name="city" onChange={this.handleChange} />
              </div>
            </div>
            <div className="form-group">
              <div className="col-sm-12">
                <input type="text" className="form-control" placeholder="Location" value={this.state.location} name="location" onChange={this.handleChange} />
              </div>
            </div>
            <div className="form-group">
              <div className="col-sm-12 text-center">
                <button className="btn btn-default">Create Protest</button>&nbsp;&nbsp;
                <Link to='/'>Cancel</Link>
              </div>
            </div>
          </form>
        </div>
      </div>
    );
  }

}

export default ProtestCreatePage;
