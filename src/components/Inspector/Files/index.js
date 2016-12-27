import React from 'react';
import CSSModules from 'react-css-modules';

import FileGroup from './FileGroup';

import styles from './styles/index.css';

function Files({ info }) {
  return (
    <div>
      {info.files.map(({ name, files, fileStats }, index) => (
        <div key={index}>
          {info.files.length > 1 && <p>{name}</p>}
          <FileGroup files={files} fileStats={fileStats} />
        </div>
      ))}
    </div>
  );
}

export default CSSModules(styles)(Files);
