import React from 'react';
import CSSModules from 'react-css-modules';

import styles from './styles/index.css';

function TrackerGroup({ trackers }) {
  return (
    <div>
      {trackers.length > 0 &&
        <ul styleName='trackerList'>
          {trackers.map((tracker, index) => (
            <li key={index} styleName='trackerRow'>
              <p>Tier {tracker.tier + 1}</p>
              <strong>{tracker.announce}</strong>
            </li>
          ))}
        </ul>
      }
    </div>
  );
}

export default CSSModules(styles)(TrackerGroup);
