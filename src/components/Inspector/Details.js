import React from 'react';

import { parseUri } from 'util/uri';

import DetailsRow from './Row';

function formatComment(comment) {
  const uri = parseUri(comment);

  if (uri.protocol === 'http' || uri.parseUri === 'https') {
    const encodedUri = encodeURI(uri);

    return (
      <a href={encodedUri} target='_blank'>{encodedUri}</a>
    );
  }

  return comment;
}

function Details({ info, setLocation, canSetLocation }) {
  return (
    <div>
      <h3>Details</h3>
      <DetailsRow label='Size' value={info.size} />
      <DetailsRow label='Location' value={info.foldername} action={setLocation} actionable={canSetLocation}/>
      <DetailsRow label='Hash' value={info.hash} />
      <DetailsRow label='Privacy' value={info.privacy} />
      <DetailsRow label='Origin' value={info.origin} />
      <DetailsRow label='Comment' value={formatComment(info.comment)} />
    </div>
  );
}

export default Details;
