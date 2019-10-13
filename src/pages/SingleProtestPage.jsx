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
    document.querySelector('body').style.backgroundColor = 'rgba(10, 10, 10, 1)';
    this.updateStateFunction();
  }

  componentWillUnmount() {
    document.querySelector('body').style.backgroundColor = 'rgba(40, 40, 40, 1)';
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
          <div className="user-links">
            <Link className="skyblue no-underline hover-white edit-link" to={`/protests/${this.props.protestID}/stories/${this.state.userStoryID}/update`}>Edit your Story</Link>
            <a className="no-underline delete-link" href="#top" onClick={() => this.deleteStory(s._id)}>Delete</a>
          </div>;
        }
        return (
          <div key={idx + 1} className="story-ctnr">
            <div className="story-details-ctnr">
              <h5 className="story-number">Story #{idx + 1}: </h5>
              <img id={s._id} className="story-image" src={s.photoUrl} alt="" />
              <div className="story-text-content">
                <p className="story-creator"><span className="skyblue">{this.state.users[idx]}</span> said:</p>
                <p className="story-mood">Why I <span className="skyblue">{s.mood}</span>:</p>
                <p className="story-entry">"{s.entry}"</p>
              </div>
            </div>
            {usersButtons}
            <a className="skyblue no-underline hover-white back-to-top-link" href='#top'>Back to the Top</a>
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
        <a className="skyblue no-underline hover-white" href={`#${this.state.userStoryID}`}>See your Story</a>
        :
        <Link className="skyblue no-underline hover-white" to={`${this.props.match.url}/stories/create`}>Add your Story!</Link>
    }

    return (
      <div className="SingleProtestPage">
        <section className="top-section">
          <div className="protest-details-ctnr">
            <h3 className='protest-name'>{protest.name}</h3>
            <div className="protest-other-details">
              <p>Date:<br/><span className="protest-other-detail skyblue">{moment(protest.date).format("MMMM Do, YYYY")}</span></p>
              <p>City:<br/><span className="protest-other-detail skyblue">{protest.city}</span></p>
              <p># stories:<br/><span className="protest-other-detail skyblue">{this.state.stories.length}</span></p>
              <p>Location:<br/><span className="protest-other-detail skyblue">{protest.location}</span></p>
            </div>
            {/* <input class="search-bar" id="search" type="text" name="query" onkeyup={() => search()} placeholder="Search Stories" /> */}
            {storyLinks}
          </div>
        </section>
        <section className="stories-section">
          {stories}
        </section>
      </div>
    );
  }
}

export default SingleProtestPage;
