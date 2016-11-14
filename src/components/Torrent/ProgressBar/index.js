import React from 'react';
import CSSModules from 'react-css-modules';

import styles from './styles/index.css';

function getPercentage(torrent) {
  // TODO: Extract from session store if configure globally or grab torrent one
  const seedRatioLimit = torrent.seedRatioLimit;

  if (torrent.needsMetaData) {
    return torrent.metadataPercentComplete * 100;
  }

  if (!torrent.isDone) {
    return Math.round(torrent.percentDone * 100);
  }

  if (seedRatioLimit > 0 && torrent.isSeeding) {
    return Math.round(torrent.uploadRatio * 100 / seedRatioLimit);
  }

  return 100;
}

function ProgressBar({ torrent }) {
  return (
    <div styleName='torrentProgressBar'>
      <progress max='100' value={getPercentage(torrent)} />
    </div>
  );
}

export default CSSModules(ProgressBar, styles);
