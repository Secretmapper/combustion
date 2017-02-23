import React from 'react';
import CSSModules from 'react-css-modules';

import FileRow from './FileRow';

import styles from './styles/index.css';

function FileList({ entries }) {
  return (
    <ul styleName='fileList'>
      {Object.keys(entries).map((key, index) => (
        <li key={index}>
          <FileRow name={key} node={entries[key]} />
        </li>
      ))}
    </ul>
  );
};

export default CSSModules(styles)(FileList);
