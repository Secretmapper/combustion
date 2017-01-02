import React from 'react';
import CSSModules from 'react-css-modules';

import TrackerGroup from './TrackerGroup';

import styles from './styles/index.css';

function Trackers({ info }) {
  return (
    <div>
      {info.trackers.map(({ name, trackers }, index) => (
        <div key={index}>
          {info.trackers.length > 1 && <p>{name}</p>}
          <TrackerGroup trackers={trackers} />
        </div>
      ))}
    </div>
  );
}

export default CSSModules(styles)(Trackers);
