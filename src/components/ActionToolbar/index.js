import React, { Component} from 'react';
import CSSModules from 'react-css-modules';
import { inject, observer } from 'mobx-react';

import toolbarFolderImage from '../../images/toolbar-folder.png';
import toolbarCloseImage from '../../images/toolbar-close.png';
import toolbarPauseImage from '../../images/toolbar-pause.png';
import toolbarStartImage from '../../images/toolbar-start.png';
import toolbarPauseAllImage from '../../images/toolbar-pause-all.png';
import toolbarStartAllImage from '../../images/toolbar-start-all.png';

import styles from './styles';

@CSSModules(styles)
class ActionToolbar extends Component {
  onOpen(){
    alert('open');
  }

  onRemove(){
    alert('remove');
  }

  onPause(){
    alert('pause');
  }

  onStart(){
    alert('start');
  }

  onPauseAll(){
    alert('pause all');
  }

  onStartAll(){
    alert('start all');
  }

  render() {
    const isSelected = this.props.view_store.selectedTorrents.length > 0;

    return (
      <div styleName='toolbar'>
        <button styleName='button' onClick={this.onOpen}>
          <img src={toolbarFolderImage} title='Open Torrent' alt='Open Torrent'/>
        </button>
        <button styleName='button' onClick={this.onRemove} disabled={!isSelected}>
          <img src={toolbarCloseImage} title='Remove Selected Torrents' alt='Remove Selected Torrents'/>
        </button>
        <span styleName='separator'></span>
        <button styleName='button' onClick={this.onStart} disabled={!isSelected}>
          <img src={toolbarStartImage} title='Start Selected Torrents' alt='Start Selected Torrents'/>
        </button>
        <button styleName='button' onClick={this.onPause} disabled={!isSelected}>
          <img src={toolbarPauseImage} title='Pause Selected Torrents' alt='Pause Selected Torrents'/>
        </button>
        <span styleName='separator'></span>
        <button styleName='button' onClick={this.onStartAll}>
          <img src={toolbarStartAllImage} title='Start All Torrents' alt='Start All Torrents'/>
        </button>
        <button styleName='button' onClick={this.onPauseAll}>
          <img src={toolbarPauseAllImage} title='Pause All Torrents' alt='Pause All Torrents'/>
        </button>
      </div>
    );
  }
}

export default inject('view_store')(observer(ActionToolbar));
