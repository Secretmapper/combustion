import React from 'react';
import CSSModules from 'react-css-modules';

import styles from './styles/index.css';

function ProgressBar({ torrent }) {
  return (
    <div styleName='torrentProgressBar'>
      <progress max="100" value="80" />
    </div>
  );
}

export default CSSModules(ProgressBar, styles);
