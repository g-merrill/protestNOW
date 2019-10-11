import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faVectorSquare } from '@fortawesome/free-solid-svg-icons'
import './css/ImageUpload.css';


const Spinner = () => (
  <div className="Spinner-rolling">
    <div className='Spinner-spinner Spinner-fadein'>
      <FontAwesomeIcon icon={faVectorSquare} size='5x' color='black' />
    </div>
  </div>
);

export default Spinner;