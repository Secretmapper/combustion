import React from 'react';
import CSSModules from 'react-css-modules';

import styles from './styles/index.css';

function ActivityRow({ label, value }) {
  return (
    <div styleName='row'>
      <div styleName='key'>{label}:</div>
      <div styleName='value'>{value}</div>
    </div>
  );
}

export default CSSModules(styles)(ActivityRow);
