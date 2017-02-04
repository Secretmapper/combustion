import React from 'react';
import CSSModules from 'react-css-modules';

import lowImage from 'images/file-priority-low.png';
import normalImage from 'images/file-priority-normal.png';
import highImage from 'images/file-priority-high.png';

import styles from './styles/index.css';

function PriorityButton() {
  return (
    <div styleName='priorityButton'>
      <button title='Low Priority'>
        <img src={lowImage} alt='Low Priority' />
      </button>
      <button title='Normal Priority'>
        <img src={normalImage} alt='Normal Priority' />
      </button>
      <button title='High Priority'>
        <img src={highImage} alt='High Priority' />
      </button>
    </div>
  );
}

export default CSSModules(styles)(PriorityButton);
