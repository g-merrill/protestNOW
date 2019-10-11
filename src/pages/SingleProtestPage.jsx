import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import moment from 'moment';
import './css/SingleProtestPage.css'
import userService from '../utils/userService';

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
    const users = [];
    let userHasStory = false;
    let userStoryUrl = '';
    for (let story of stories) {
      let user = story.creator;
      if (this.props.user && this.props.user.username === user.username) {
        userHasStory = true;
        userStoryUrl = `#${story._id}`
        // userStoryUrl = `/protests/${this.props.protestID}#${story._id}`
      }
      user = (user.firstName && user.lastInitial) ? `${user.firstName} ${user.lastInitial}` : user.username;
      users.push(user);
    }
    this.setState({ protest, stories, users, userHasStory, userStoryUrl });
  }

  render() {
    let stories = this.state.stories.length ?
      this.state.stories.map((s, idx) => {
        return (
          <div key={idx + 1} className="story-ctnr">
            <p>Story #{idx + 1}: </p>
            <img src={s.photoUrl} alt="" />
            <p id={s._id}>{this.state.users[idx]} said:</p>
            <p>Why I {s.mood}</p>
            <p>"{s.entry}"</p>
          </div>
        );
      }
      )
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
          <a href={this.state.userStoryUrl}>See your Story</a>
          // <Link to={this.state.userStoryUrl}>See your Story</Link>
          :
          <Link to={`${this.props.match.url}/stories/create`}>Add your Story!</Link>
        }
        {stories}
      </div>
    );
  }
}

export default SingleProtestPage;
