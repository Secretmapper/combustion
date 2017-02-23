import React from 'react';
import CSSModules from 'react-css-modules';

import FileList from './FileList';
import PriorityButton from './PriorityButton';

import styles from './styles/index.css';

function FileRow({ name, node }) {
  return (
    <div styleName='fileRowContainer'>
      <div styleName='fileRow'>
        <input type='checkbox' />
        <div styleName='name'>{name}</div>
        <PriorityButton priority={node.priority} />
      </div>
      {node.entries && <FileList entries={node.entries} />}
    </div>
  );
}

export default CSSModules(styles)(FileRow);
