import React from 'react';
import CSSModules from 'react-css-modules';
import { inject } from 'mobx-react';

import { generateTree } from './services/generate-tree';
import FileRow from './FileRow';

import styles from './styles/index.css';

function Files({ info, torrents_store }) {
  // TODO: Generate tree for each torrent files
  const torrentId = info.torrents[0].id;
  const tree = generateTree(info.files[0].files);
  const rootKey = Object.keys(tree)[0];

  return (
    <div>
      <FileRow
        name={rootKey}
        node={tree[rootKey]}
        setWanted={({ fileIds, wanted }) =>
          torrents_store.setWanted(torrentId, wanted, fileIds)
        }
        setPriority={({ fileIds, priority }) =>
          torrents_store.setPriority(torrentId, priority, fileIds)
        }
      />
    </div>
  );
}

export default inject('torrents_store')(CSSModules(styles)(Files));
