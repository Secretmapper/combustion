import React, { Component} from 'react';
import CSSModules from 'react-css-modules';
import { inject, observer } from 'mobx-react';
import autobind from 'autobind-decorator';

import lowImage from 'images/file-priority-low.png';
import normalImage from 'images/file-priority-normal.png';
import highImage from 'images/file-priority-high.png';


import styles from './styles/index.css';

@inject('view_store', 'torrents_store')
@observer
@CSSModules(styles)
class FileGroup extends Component {
  @autobind onClickPriority(fileId, priority) {
    const selectedTorrentIds = this.props.view_store.selectedTorrents;

    this.props.torrents_store.setPriority(selectedTorrentIds[0], priority, [fileId]);
  }

  render () {
    // TODO: Render tree view
    const { files, fileStats } = this.props;

    return (
      <div>
        {files.length > 0 &&
          <ul styleName='fileList'>
            {files.map((file, index) => {
              const stats = fileStats[index];
              const priority = stats.priority;
              const lowStyle = (priority === -1 ? 'selected' : '');
              const normalStyle = (priority === 0 ? 'selected' : '');
              const highStyle = (priority === 1 ? 'selected' : '');

              return (
                <li key={index} styleName='fileRow'>
                  <input type='checkbox' disabled='disabled' checked={stats.wanted}/>
                  <div styleName='name'>{file.name}</div>
                  <div styleName='priority'>
                    <button styleName={lowStyle} onClick={() => this.onClickPriority(index, 'low')} title='Low Priority'>
                      <img src={lowImage} alt='Low Priority' />
                    </button>
                    <button styleName={normalStyle} onClick={() => this.onClickPriority(index, 'normal')} title='Normal Priority'>
                      <img src={normalImage} alt='Normal Priority' />
                    </button>
                    <button styleName={highStyle} onClick={() => this.onClickPriority(index, 'high')} title='High Priority'>
                      <img src={highImage} alt='High Priority' />
                    </button>
                  </div>
                </li>
              );

            })}
          </ul>
        }
      </div>
    );
  }
};

export default FileGroup;
