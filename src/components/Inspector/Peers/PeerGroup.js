import React from 'react';
import CSSModules from 'react-css-modules';

import { speed } from 'util/formatters';

import lockIconImage from 'images/lock_icon.png';

import styles from './styles/index.css';

function PeerGroup({ peers }) {
  return (
    <div>
      {peers.length > 0 &&
        <table styleName='peerList'>
          <thead>
            <tr>
              <th styleName='encryptedCol' />
              <th styleName='upCol'>Up</th>
              <th styleName='downCol'>Down</th>
              <th styleName='percentCol'>%</th>
              <th styleName='statusCol'>Status</th>
              <th styleName='addressCol'>Address</th>
              <th styleName='clientCol'>Client</th>
            </tr>
          </thead>
          <tbody>
            {peers.map((peer, index) => (
              <tr key={index} styleName='peerRow'>
                <td>{peer.isEncrypted && <img src={lockIconImage} alt='Encrypted Connection' />}</td>
                <td>{!peer.isDownloadingFrom && speed(peer.rateToClient)}</td>
                <td>{peer.isDownloadingFrom && speed(peer.rateToClient)}</td>
                <td>{peer.progress}</td>
                <td>{peer.flagStr}</td>
                <td>{peer.address}</td>
                <td>{peer.clientName}</td>
              </tr>
            ))}
          </tbody>
        </table>
      }
    </div>
  );
}

export default CSSModules(styles)(PeerGroup);
