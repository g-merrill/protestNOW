import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTimesCircle, faImage } from '@fortawesome/free-solid-svg-icons'
import './css/ImageUpload.css';

const Images = props => (
  props.images.map((image, i) =>
    <div key={i} className='Images-fadein Images-page-ctnr'>
      <div className='Images-photo-ctnr'>
        <div
          onClick={() => props.removeImage(image.public_id)}
          className='Images-delete'
        >
          <FontAwesomeIcon icon={faTimesCircle} size='2x' />
        </div>
        <img className='Images-photo' src={image.secure_url} alt='yourImg' />
      </div>
      <div className='Images-edit-btn'>
        <label htmlFor='single'>
          <FontAwesomeIcon icon={faImage} size='5x' />
        </label>
        <input type='file' id='single' onChange={props.onChange} />
      </div>
    </div>
  )
);

  export default Images;
