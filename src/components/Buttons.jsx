import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faImage } from '@fortawesome/free-solid-svg-icons'

export default props =>
  <div className='Buttons-buttons Buttons-fadein'>
    <div className='Buttons-button'>
      <label htmlFor='single'>
        <FontAwesomeIcon icon={faImage} color='black' size='10x' />
      </label>
      <input type='file' id='single' onChange={props.onChange} />
    </div>
  </div>
