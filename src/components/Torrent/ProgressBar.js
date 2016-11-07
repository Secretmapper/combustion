import React from 'react';

function ProgressBar({ torrent }) {
  return (
    <progress max="100" value="80"></progress>
  );
}

export default ProgressBar;
