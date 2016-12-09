import React from 'react';
import CSSModules from 'react-css-modules';

import styles from './styles/index.css';

function Trackers({ info }) {
  const trackers = info.trackers[0];

  return (
    <div>
      <h2>Trackers</h2>
      <ul styleName='trackers'>
      {trackers.map((tracker, index) => (
        <li key={index}>{tracker.host}</li>
      ))}
      </ul>
    </div>
  );
}

export default CSSModules(styles)(Trackers);
