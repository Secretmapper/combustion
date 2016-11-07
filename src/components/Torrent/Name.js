import React from 'react';

function Name({ torrent }) {
  return (
    <p>
      <strong>{torrent.name}</strong>
    </p>
  );
}

export default Name;
