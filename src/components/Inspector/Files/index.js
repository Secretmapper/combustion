import React, { Component } from 'react';
import CSSModules from 'react-css-modules';
import { inject, observer } from 'mobx-react';
import autobind from 'autobind-decorator';

import { Button } from 'react-toolbox/lib/button'
import { generateTree } from './services/generate-tree';
import FileRow from './FileRow';

import styles from './styles/index.css';

@inject('view_store', 'torrents_store')
@observer
@CSSModules(styles)
class Files extends Component {
  @autobind verify() {
    this.props.torrents_store.verify(this.props.view_store.selectedTorrents);
  }

  render () {
    const { info, torrents_store } = this.props
    // TODO: Generate tree for each torrent files
    const torrentId = info.torrents[0].id;
    const tree = generateTree(info.files[0].files);
    const rootKey = Object.keys(tree)[0];

    return (
      <div>
        <Button
          styleName='verifyLocalDataBtn'
          label='Verify Local Data'
          onMouseUp={this.verify}
          raised
          primary
        />
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
}

export default Files;
