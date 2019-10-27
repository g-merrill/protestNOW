import React from 'react';
import { Link } from 'react-router-dom';
import moment from 'moment';
import './css/ProtestCard.scss';

const ProtestCard = props => (
  <Link
    to={`/protests/${props.protest._id}`}
    key={props.idx}
    className="ProtestCard"
  >
    <div className="protest-details-ctnr">
      <h3 className='protest-name'>{props.protest.name}</h3>
      <p>{moment(props.protest.date).format("MMMM Do, YYYY")}</p>
      <p>City: {props.protest.city}</p>
      <p># stories: {props.protest.stories.length}</p>
      <p>Location: {props.protest.location}</p>
    </div>
  </Link>
)

export default ProtestCard;
