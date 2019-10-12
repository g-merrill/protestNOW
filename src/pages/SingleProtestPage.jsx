import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import moment from 'moment';
import './css/SingleProtestPage.css'
import storiesService from '../utils/storiesService';

class SingleProtestPage extends Component {
  state = {
    protest: {},
    stories: [],
    userHasStory: false,
    userStoryID: ''
  }

  componentDidMount() {
    this.updateStateFunction();
  }

  async updateStateFunction() {
    const protest = await this.props.getProtestByID(this.props.protestID);
    const stories = protest.stories;
    const users = [];
    let userHasStory = false;
    let userStoryID = '';
    if (stories.length) {
      stories.forEach(story => {
        let user = story.creator;
        if (this.props.user && this.props.user.username === user.username) {
          userHasStory = true;
          userStoryID = story._id.toString();
        }
        user = (user.firstName && user.lastInitial) ? `${user.firstName} ${user.lastInitial}` : user.username;
        users.push(user);
      });
    }
    this.setState({ protest, stories, users, userHasStory, userStoryID });
  }

  // submitDifferentStory = storyID => {
  //   // delete current story
  //   // reroute to story create page
  //   // OR
  //   // build out the edit story page
  //   console.log('ran submitDifferentStory function for', storyID);
  // }

  deleteStory = async storyID => {
    await storiesService.deleteStory(storyID);
    // update protest state on App level
    this.props.updateStoriesForProtest();
    // and then update the state on this page's level
    this.updateStateFunction();
  }

  render() {
    let stories = this.state.stories.length ?
      this.state.stories.map((s, idx) => {
        let usersButtons;
        if (this.props.user && this.props.user.username === s.creator.username) {
          usersButtons =
          <div>
            <Link to={`/protests/${this.props.protestID}/stories/${this.state.userStoryID}/update`}>Edit your story.</Link>
            <a href="#top" onClick={() => this.deleteStory(s._id)}>Delete your story.</a>
          </div>;
        }
        return (
          <div key={idx + 1}>
            <div className="story-ctnr">
              <p>Story #{idx + 1}: </p>
              <img id={s._id} src={s.photoUrl} alt="" />
              <div className="story-text-content">
                <p className="story-creator">{this.state.users[idx]} said:</p>
                <p className="story-mood">Why I {s.mood}:</p>
                <p className="story-entry">"{s.entry}"</p>
              </div>
            </div>
            {usersButtons}
            <a href='#top'>Back to the Top</a>
            </div>
        );
      })
      :
      <div className="story-ctnr">
        <p>No stories yet!</p>
      </div>;

    const protest = this.state.protest;

    let storyLinks;
    if (this.props.user) {
      storyLinks = this.state.userHasStory ?
        <a href={`#${this.state.userStoryID}`}>See your Story</a>
        :
        <Link to={`${this.props.match.url}/stories/create`}>Add your Story!</Link>
    }

    return (
      <div className="SingleProtestPage">
        <h3>{protest.name}</h3>
        <div className="protest-info">
          <p>{moment(protest.date).format("MMMM Do, YYYY")}</p>
          <p>{protest.city}</p>
          <p>Location: {protest.location}</p>
          <p># stories: {this.state.stories.length}</p>
        </div>
        {/* <input class="search-bar" id="search" type="text" name="query" onkeyup={() => search()} placeholder="Search Stories" /> */}
        {storyLinks}
        {stories}
      </div>
    );
  }
}

export default SingleProtestPage;
