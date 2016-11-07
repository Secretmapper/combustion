import React from 'react';

function PeerDetails({ torrent }) {
  return (
    <p>
      <strong>{torrent.totalSize}</strong>
    </p>
  );
}

export default PeerDetails;
