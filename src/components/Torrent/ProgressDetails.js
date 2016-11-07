import React from 'react';

function ProgressDetails({ torrent }) {
  return (
    <p>Downloading ... ↓ {torrent.rateDownload} ↑ {torrent.rateUpload}</p>
  );
}

export default ProgressDetails;
