import React from 'react';

import DetailsRow from './Row';

function Details({ info }) {
  return (
    <div>
      <h2>Details</h2>
      <DetailsRow label='Size' value={info.size} />
      <DetailsRow label='Piece count' value={info.pieceCount} />
      <DetailsRow label='Piece size' value={info.pieceSize} />
      <DetailsRow label='Location' value={info.location} />
      <DetailsRow label='Hash' value={info.hash} />
      <DetailsRow label='Privacy' value={info.privacy} />
      <DetailsRow label='Origin' value={info.origin} />
      <DetailsRow label='Comment' value={info.comment} />
    </div>
  );
}

export default Details;
