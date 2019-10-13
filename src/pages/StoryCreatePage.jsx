import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Spinner from '../components/Spinner';
import Images from '../components/Images';
import Buttons from '../components/Buttons';

import './css/StoryCreatePage.css';
import '../components/css/ImageUpload.css';
import storiesService from '../utils/storiesService';

const API_URL = '/api/v1/media';

class StoryCreatePage extends Component {
  state = {
    uploading: false,
    images: [],
    imgUrl: '',
    mood: 'am here',
    entry: ''
  }

  // change event handler for image-upload
  onChange = e => {
    const files = Array.from(e.target.files);
    this.setState({ uploading: true });
    const formData = new FormData();
    files.forEach((file, i) => {
      formData.append(i, file)
    });
    fetch(`${API_URL}/image-upload`, {
      method: 'POST',
      body: formData
    })
    .then(res => res.json())
    .then(images => {
      let imgUrl = images[0].secure_url;
      this.setState({
        uploading: false,
        images,
        imgUrl
      });
    });
  }

  removeImage = id => {
    this.setState({
      images: this.state.images.filter(image => image.public_id !== id)
    });
  }

  // change event handler for other state inputs
  handleChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  }

  handleSubmit = async e => {
    e.preventDefault();
    try {
      let storyInputs = {
        protest: this.props.protestID,
        creator: this.props.user._id,
        photoUrl: this.state.imgUrl,
        mood: this.state.mood,
        entry: this.state.entry,
      };

      // THIS IS THE BACKEND STUFF
      // below is the fetch call in the service file
      await storiesService.addStory(storyInputs);
      // THIS IS THE BACKEND STUFF
      // add story to protest in db
      // add story to user in db

      // somehow tell app's protest to do a fresh db call
      this.props.updateStoriesForProtest();
      // Successfully signed up - show GamePage
      this.props.history.push(`/protests/${this.props.protestID}`);
    } catch (err) {
      // Invalid story data
      console.log(err);
    }
  }

  render() {
    const uploading = this.state.uploading;
    const images = this.state.images;
    const content = () => {
      switch(true) {
        case uploading:
          return <Spinner />
        case images.length > 0:
          return <Images images={images} removeImage={this.removeImage} onChange={this.onChange} />
        default:
          return <Buttons onChange={this.onChange} />
      }
    }
    return (
      <div className="StoryCreatePage">
        <form className="form-horizontal story-form" onSubmit={this.handleSubmit}>
          <div className='ImageUpload'>
            {content()}
          </div>
          <br/>
          <span className="mood-ctnr">
            <p className="mood-whyI">Why I ...</p>
            <select name="mood" onChange={this.handleChange} className="mood-dropdown form-control">
              <option defaultValue="am here">am here</option>
              <option value="am showing up">am showing up</option>
            </select>
          </span>
          <br/>
          <div className="entry-ctnr">
            <span className="beg-quote">"</span>
            <textarea className="entry-text-area" name="entry" id="entry" cols="30" rows="10" placeholder="Enter your story here." onChange={this.handleChange}></textarea>
            <span className="end-quote">"</span>
          </div>
          <div className="form-group">
            <div className="col-sm-12 text-center">
              <button className="btn btn-default hover-white add-story-btn">Add Your Story</button>&nbsp;&nbsp;
              <Link className="btn btn-default hover-white cancel-btn" to={`/protests/${this.props.protestID}`}>Cancel</Link>
            </div>
          </div>
        </form>
      </div>
    );
  }
}

export default StoryCreatePage;
