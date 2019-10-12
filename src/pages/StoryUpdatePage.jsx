import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faImage, faCircle } from '@fortawesome/free-solid-svg-icons'
import moment from 'moment';
import Spinner from '../components/Spinner';
import Images from '../components/Images';
import storiesService from '../utils/storiesService';
import '../components/css/ImageUpload.css';
import './css/StoryUpdatePage.css';

const API_URL = '/api/v1/media';

class StoryUpdatePage extends Component {

  state = {
    prevStory: {
      protest: '',
      creator: '',
      mood: '',
      photoUrl: '',
      entry: '',
    },
    uploading: false,
    images: [],
    imgUrl: '',
    mood: '',
    entry: ''
  };

  async componentDidMount() {
    // load story to be edited
    const prevStory = await storiesService.getStory(this.props.storyID);
    const imgUrl = prevStory.photoUrl;
    const mood = prevStory.mood;
    const entry = prevStory.entry;
    prevStory && this.setState({ prevStory, imgUrl, mood, entry });
  }

  // change event handler for other state inputs
  handleChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
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

  handleSubmit = async e => {
    e.preventDefault();
    try {
      let storyInputs = {
        protest: this.props.protestID,
        creator: this.state.prevStory.creator._id,
        photoUrl: this.state.imgUrl,
        mood: this.state.mood,
        entry: this.state.entry,
      };
      await storiesService.editStory(this.props.storyID, storyInputs);
      this.props.history.push(`/protests/${this.props.protestID}`);
    } catch (err) {
      console.log(err);
    }
  }

  render() {
    const prevStory = this.state.prevStory;
    const storyCreator = ((prevStory.creator.firstName && prevStory.creator.lastInitial) && `${prevStory.creator.firstName} ${prevStory.creator.lastInitial}`) || prevStory.creator.username;
    const uploading = this.state.uploading;
    const images = this.state.images;
    const content = () => {
      switch(true) {
        case uploading:
          return <Spinner />
        case images.length > 0:
          return <Images images={images} removeImage={this.removeImage} onChange={this.onChange} />
        default:
          return (
            <div className='Images-fadein'>
              <img src={this.state.imgUrl} alt='' />
              <div className='Images-edit-btn'>
                <label htmlFor='single' className='fa-layers fa-fw'>
                  <FontAwesomeIcon icon={faCircle} color='black' size='6x' />
                  <FontAwesomeIcon icon={faImage} color='#f2f2f2' size='4x' />
                </label>
                <input type='file' id='single' onChange={this.onChange} />
              </div>
            </div>
          );
      }
    }
    return (
      <div className="StoryUpdatePage">
        <h3>Update Your Story for: </h3>
        <h4>{ prevStory.protest.name }</h4>
        <h5>{ moment(prevStory.protest.date).format('MMMM Do, YYYY') }</h5>
        <form className="form-horizontal story-form" onSubmit={this.handleSubmit}>
          <div className='ImageUpload'>
            {content()}
          </div>
          <p>{ storyCreator } said: </p>
          <p>Why I { prevStory.mood }:</p>
          <p>"{ prevStory.entry }"</p>
          <hr/>
          <span className="mood-ctnr">
            <p className="mood-whyI">Why I</p>
            <select name="mood" onChange={this.handleChange} className="mood-dropdown form-control">
              <option defaultValue="am here">am here</option>
              <option value="am showing up">am showing up</option>
            </select>
          </span>
          <br/>
          <div className="entry-ctnr">
            <span className="beg-quote">"</span>
            <textarea name="entry" id="entry" cols="30" rows="10" defaultValue={prevStory.entry} placeholder="Enter your story here." onChange={this.handleChange}></textarea>
            <span className="end-quote">"</span>
          </div>
          <div className="form-group">
            <div className="col-sm-12 text-center">
              <button className="btn btn-default">Save Your Story</button>&nbsp;&nbsp;
              <Link to={`/protests/${this.props.protestID}`}>Cancel</Link>
            </div>
          </div>
        </form>
      </div>
    );
  }
}

export default StoryUpdatePage;
