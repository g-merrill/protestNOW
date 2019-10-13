import React from 'react';
import { Link } from 'react-router-dom';
import moment from 'moment';
import './css/ProtestsCtnr.css'

const ProtestsCtnr = props => (
  <div className="ProtestsCtnr">
    {props.protests.map((p, idx) => (
      <Link
        to={`/protests/${p._id}`}
        key={idx}
        className="protest-link"
      >
        <div className="protest-details-ctnr">
          <h3 className='protest-name'>{p.name}</h3>
          <p>{moment(p.date).format("MMMM Do, YYYY")}</p>
          <p>City: {p.city}</p>
          <p># stories: {p.stories.length}</p>
          <p>Location: {p.location}</p>
        </div>
      </Link>
    ))}
  </div>
);

export default ProtestsCtnr;
