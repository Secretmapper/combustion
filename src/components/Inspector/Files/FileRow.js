import React from 'react';
import CSSModules from 'react-css-modules';

import FileList from './FileList';
import PriorityButton from './PriorityButton';
import WantedButton from './WantedButton';

import styles from './styles/index.css';

function FileRow({ name, node, setPriority, setWanted }) {
  const { priority, fileIds, entries } = node;
  const wanted = !!node.wanted;

  return (
    <div styleName='fileRowContainer'>
      <div styleName='fileRow'>
        <WantedButton
          wanted={wanted}
          fileIds={fileIds}
          setWanted={setWanted}
        />
        <div styleName='name'>{name}</div>
        <PriorityButton
          priority={priority}
          fileIds={fileIds}
          setPriority={setPriority}
        />
      </div>
      {entries && <FileList entries={entries} setPriority={setPriority} setWanted={setWanted} />}
    </div>
  );
}

export default CSSModules(styles)(FileRow);
