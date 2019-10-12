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
      >
        <div className="protest-link-ctnr">
          <h3>{p.name}</h3>
          <p>{moment(p.date).format("MMMM Do, YYYY")}</p>
          <p>{p.city}</p>
          <p>Location: {p.location}</p>
          <p># stories: {p.stories.length}</p>
        </div>
      </Link>
    ))}
  </div>
);

export default ProtestsCtnr;
