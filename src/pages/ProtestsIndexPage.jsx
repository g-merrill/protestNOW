import React from 'react';
import './css/ProtestsIndexPage.css';
import ProtestCard from '../components/ProtestCard';

const ProtestsIndexPage = props => (
  <div className="ProtestsIndexPage">
    {props.protests.map((p, idx) => (
      <ProtestCard
        protest={p}
        idx={idx}
      />
    ))}
  </div>
);

export default ProtestsIndexPage;
