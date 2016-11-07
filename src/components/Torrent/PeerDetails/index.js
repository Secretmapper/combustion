import React from 'react';

import { getPeerDetails } from './services/formatters';

function PeerDetails({ torrent }) {
  return (
    <p>{getPeerDetails(torrent)}</p>
  );
}

export default PeerDetails;
