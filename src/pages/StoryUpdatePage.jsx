import React, { Component } from 'react';
import storiesService from '../utils/storiesService';

class StoryUpdatePage extends Component {

  state = {
    story: {}
  };

  async componentDidMount() {
    // load story
    // XXX NEED TO DEFINE getStory function
    const story = await storiesService.getStory(this.props.storyID);


  }

  render() {
    return (
      <div className="StoryUpdatePage">StoryUpdatePage</div>
    );
  }
}

export default StoryUpdatePage;
