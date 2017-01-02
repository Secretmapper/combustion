import React from 'react';
import CSSModules from 'react-css-modules';

import PeerGroup from './PeerGroup';

import styles from './styles/index.css';

function Peers({ info }) {
  return (
    <div>
      {info.peers.map(({ name, peers }, index) => (
        <div key={index}>
          {info.peers.length > 1 && <p>{name}</p>}
          <PeerGroup peers={peers} />
        </div>
      ))}
    </div>
  );
}

export default CSSModules(styles)(Peers);
