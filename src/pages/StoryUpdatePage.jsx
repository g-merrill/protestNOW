import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import storiesService from '../utils/storiesService';
import moment from 'moment';

class StoryUpdatePage extends Component {

  state = {
    story: {
      protest: '',
      creator: '',
      mood: '',
      photoUrl: '',
      entry: '',
    }
  };

  async componentDidMount() {
    // load story
    // XXX NEED TO DEFINE getStory function
    const story = await storiesService.getStory(this.props.storyID);
    story && this.setState({ story });

  }

  render() {
    const story = this.state.story;
    const storyCreator = ((story.creator.firstName && story.creator.lastInitial) && `${story.creator.firstName} ${story.creator.lastInitial}`) || story.creator.username;
    return (
      <div className="StoryUpdatePage">
        <h3>Update Your Story for: </h3>
        <h4>{ story.protest.name }</h4>
        <h5>{ moment(story.protest.date).format('MMMM Do, YYYY') }</h5>
        <p>creator: { storyCreator }</p>
        <p>mood: { story.mood }</p>
        <p>photoUrl: { story.photoUrl }</p>
        <p>entry: { story.entry }</p>
        <Link to={`/protests/${this.props.protestID}`}>Cancel</Link>
      </div>
    );
  }
}

export default StoryUpdatePage;
