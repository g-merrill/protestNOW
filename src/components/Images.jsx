import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTimesCircle, faImage, faCircle } from '@fortawesome/free-solid-svg-icons'
import './css/ImageUpload.css';

const Images = props => (
  props.images.map((image, i) =>
    <div key={i} className='Images-fadein'>
      <div
        onClick={() => props.removeImage(image.public_id)}
        className='Images-delete'
      >
        <FontAwesomeIcon icon={faTimesCircle} size='2x' />
      </div>
      <img src={image.secure_url} alt='' />
      <div className='Images-edit-btn'>
        <label htmlFor='single' className='fa-layers fa-fw'>
          <FontAwesomeIcon icon={faCircle} color='black' size='6x' />
          <FontAwesomeIcon icon={faImage} color='#f2f2f2' size='4x' />
        </label>
        <input type='file' id='single' onChange={props.onChange} />
      </div>
    </div>
  )
);

  export default Images;
