import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faVectorSquare } from '@fortawesome/free-solid-svg-icons'
import './css/ImageUpload.css';


const Spinner = () => (
  <>
    <div className="Spinner-rolling left">
      <div className='Spinner-spinner Spinner-fadein'>
        <FontAwesomeIcon icon={faVectorSquare} size='5x' />
      </div>
    </div>
    <div className="Spinner-rolling right">
      <div className='Spinner-spinner Spinner-fadein'>
        <FontAwesomeIcon icon={faVectorSquare} size='5x' />
      </div>
    </div>
  </>
);

export default Spinner;
