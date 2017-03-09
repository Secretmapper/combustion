import React from 'react';
import CSSModules from 'react-css-modules';

import lowImage from 'images/file-priority-low.png';
import normalImage from 'images/file-priority-normal.png';
import highImage from 'images/file-priority-high.png';

import styles from './styles/index.css';

function PriorityButton({ priority, fileIds, setPriority }) {
  return (
    <div styleName='priorityButton'>
      <button
        title='Low Priority'
        className={priority.includes(-1) ? styles.selected : ''}
        onClick={() => setPriority({fileIds, priority: 'low'})}
      >
        <img src={lowImage} alt='Low Priority' />
      </button>
      <button
        title='Normal Priority'
        className={priority.includes(0) ? styles.selected : ''}
        onClick={() => setPriority({fileIds, priority: 'normal'})}
      >
        <img src={normalImage} alt='Normal Priority' />
      </button>
      <button
        title='High Priority'
        className={priority.includes(1) ? styles.selected : ''}
        onClick={() => setPriority({fileIds, priority: 'high'})}
      >
        <img src={highImage} alt='High Priority' />
      </button>
    </div>
  );
}

export default CSSModules(styles)(PriorityButton);
