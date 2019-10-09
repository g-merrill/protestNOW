import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import moment from 'moment';
import './css/SingleProtestPage.css'

class SingleProtestPage extends Component {
  state = {
    protest: {},
    stories: [],
    userHasStory: false,
    userStoryUrl: ''
  }

  async componentDidMount() {
    const protest = await this.props.getProtestByID(this.props.protestID);
    const stories = protest.stories;
    this.setState({ protest, stories });
  }
  render() {
    let stories = this.state.stories.length ?
      this.state.protest.stories.map((s, idx) => (
        <div key={idx + 1} className="story-ctnr">
          <p>Story #{idx + 1}: </p>
          <p>"{s.entry}"</p>
        </div>
      ))
      :
      <div className="story-ctnr">
        <p>No stories yet!</p>
      </div>;

      const protest = this.state.protest;

    return (
      <div className="SingleProtestPage">
        <h3>{protest.name}</h3>
        <div className="protest-info">
          <p>{moment(protest.date).format("MMMM Do, YYYY")}</p>
          <p>{moment(protest.date).format("h:mm a")}</p>
          <p>{protest.city}</p>
          <p>Location: {protest.location}</p>
          <p># stories: {this.state.stories.length}</p>
        </div>
        {this.state.userHasStory ?
          <Link to={`${this.props.match.url}#${this.state.userStoryUrl}`}>See your Story</Link>
          :
          <Link to={`${this.props.match.url}/stories/create`}>Add your Story!</Link>
        }
        {stories}
      </div>
    );
  }
}

export default SingleProtestPage;
