import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faImage } from '@fortawesome/free-solid-svg-icons'

export default props =>
  <div className='Buttons-page-ctnr Buttons-fadein'>
    <div className='Buttons-button'>
      <label htmlFor='single'>
        <FontAwesomeIcon icon={faImage} size='10x' />
      </label>
      <input type='file' id='single' onChange={props.onChange} />
    </div>
  </div>
