import React from 'react';
import CSSModules from 'react-css-modules';

import styles from './styles/index.css';

function Files({ info }) {
  const files = info.files[0];

  return (
    <div>
      <h2>Files</h2>
      <ul styleName='files'>
      {files.map((file, index) => (
        <li key={index} styleName='file'>
          <input type='checkbox' disabled='disabled' checked={file.wanted}/>
          <div styleName='name'>{file.name}</div>
          <span>P: {file.priority}</span>

          <div styleName='priority'>
            <button onClick={() => this.onClickPriority(index, 'low')} title='Low Priority'>∨</button>
            <button onClick={() => this.onClickPriority(index, 'normal')} title='Normal Priority'>-</button>
            <button onClick={() => this.onClickPriority(index, 'high')} title='High Priority'>∧</button>
          </div>
        </li>
      ))}
      </ul>
    </div>
  );
}

export default CSSModules(styles)(Files);
