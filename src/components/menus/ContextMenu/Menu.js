import React from 'react';
import CSSModules from 'react-css-modules';

import styles from './styles/index.css';

function Menu({ style, children }) {
  return (
    <div styleName='contextMenuOuter' style={style}>
      <div styleName='contextMenuInner'>
        {children}
      </div>
    </div>
  );
}

export default CSSModules(Menu, styles);
