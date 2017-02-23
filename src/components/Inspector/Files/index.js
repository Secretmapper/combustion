import React from 'react';
import CSSModules from 'react-css-modules';

import { generateTree } from './services/generate-tree';
import FileRow from './FileRow';

import styles from './styles/index.css';

function Files({ info }) {
  // TODO: Generate tree for each torrent files
  const tree = generateTree(info.files[0].files);
  const rootKey = Object.keys(tree)[0];

  return (
    <div>
      <FileRow name={rootKey} node={tree[rootKey]} />
    </div>
  );
}

export default CSSModules(styles)(Files);
