import React, { Component } from 'react';
import Spinner from '../components/Spinner';
import Images from '../components/Images';
import Buttons from '../components/Buttons';

import './css/StoryCreatePage.css';
import '../components/css/ImageUpload.css';

const API_URL = '/api/v1/media';

class StoryCreatePage extends Component {
  state = {
    hasPhoto: false,
    imgSrc: '#',
    mood: 'am here:',
    photo: '',
    uploading: false,
    images: []
  }

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
      this.setState({
        uploading: false,
        images
      });
    });
  }

  removeImage = id => {
    this.setState({
      images: this.state.images.filter(image => image.public_id !== id)
    });
  }

  handleChange = e => {
    console.log(e.target, e.target.value);
    this.setState({
      [e.target.name]: e.target.value
    });
  }

  render() {
    const photo =
      <img src={this.state.imgSrc} className="photo" alt="story"/>;
    const uploading = this.state.uploading;
    const images = this.state.images;
    const content = () => {
      switch(true) {
        case uploading:
          return <Spinner />
        case images.length > 0:
          return <Images images={images} removeImage={this.removeImage} />
        default:
          return <Buttons onChange={this.onChange} />
      }
    }
    return (
      <div className="StoryCreatePage">
        {/*  */}






        <div className='StoryCreatePage-buttons'>
          {content()}
        </div>









        {/*  */}
        <div className="photo-ctnr">
          <form className="photo-edit-btn" encType="multipart/form-data">
            <label htmlFor="uploadedPhoto"><i className="fas fa-pen-square"></i></label>
            <input type="file" accept="image/*" name="photo" id="uploadedPhoto" className="photo-input" onChange={this.handleChange}/>
          </form>
          {this.state.hasPhoto && photo}
        </div>
        <br/>
        <span className="mood-ctnr">&nbsp; Why I &nbsp;<div className="mood-dropdown">&nbsp;{this.state.mood}&nbsp;<div className="mood-dropdown-arrow"></div>&nbsp;</div></span>
        <br/>
        <div className="entry-ctnr">
          <span className="beg-quote">"</span>
          <textarea name="entry" id="entry" cols="30" rows="10" placeholder="Enter your story here."></textarea>
          <span className="end-quote">"</span>
        </div>
      </div>
    );
  }
}

export default StoryCreatePage;
