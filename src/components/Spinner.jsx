import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBowlingBall } from '@fortawesome/free-solid-svg-icons'
import './css/ImageUpload.css';


const Spinner = () => (
  <div className="Spinner-rolling">
    <div className='Spinner-spinner Spinner-fadein'>
      <FontAwesomeIcon icon={faBowlingBall} size='5x' color='#3B5998' />
    </div>
  </div>
);

export default Spinner;
