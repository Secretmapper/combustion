import React from 'react';
import CSSModules from 'react-css-modules';

import { speedBps } from 'util/formatters';

import lockIconImage from 'images/lock_icon.png';

import styles from './styles/index.css';

const flagMap = {
  'O': "Optimistic unchoke",
  'D': "Downloading from this peer",
  'd': "We would download from this peer if they'd let us",
  'U': "Uploading to peer",
  'u': "We would upload to this peer if they'd ask",
  'K': "Peer has unchoked us, but we're not interested",
  '?': "We unchoked this peer, but they're not interested",
  'E': "Encrypted Connection",
  'H': "Peer was discovered through Distributed Hash Table (DHT)",
  'X': "Peer was discovered through Peer Exchange (PEX)",
  'I': "Peer is an incoming connection",
  'T': "Peer is connected via uTP",
};

function formatPeerFlag(flag) {
  const flagExplanation = flagMap[flag];

  if (!flagExplanation) {
    return String(flag);
  }

  return `${flag}: ${flagExplanation}`;
}

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
                <td>{peer.isUploadingTo && speedBps(peer.rateToPeer)}</td>
                <td>{peer.isDownloadingFrom && speedBps(peer.rateToClient)}</td>
                <td styleName='percentCol'>{`${Math.floor(peer.progress * 100)}%`}</td>
                <td>{[...peer.flagStr].map((flag) => <span key={flag} title={formatPeerFlag(flag)}>{flag}</span>)}</td>
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
