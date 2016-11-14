import React, { Component} from 'react';
import CSSModules from 'react-css-modules';
import { inject, observer } from 'mobx-react';

import toolbarFolderImage from '../../images/toolbar-folder.png';
import toolbarCloseImage from '../../images/toolbar-close.png';
import toolbarPauseImage from '../../images/toolbar-pause.png';
import toolbarStartImage from '../../images/toolbar-start.png';
import toolbarPauseAllImage from '../../images/toolbar-pause-all.png';
import toolbarStartAllImage from '../../images/toolbar-start-all.png';
import toolbarInfoImage from '../../images/toolbar-info.png';

import OpenDialog from 'components/OpenDialog';
import Torrent from 'stores/torrent';

import styles from './styles/index.css';

@inject('torrents_store', 'view_store')
@observer
@CSSModules(styles)
class ActionToolbar extends Component {
  constructor(props) {
    super(props);

    this.onOpen = this.onOpen.bind(this);
    this.onToggleInspector = this.onToggleInspector.bind(this);
  }

  onOpen() {
    this.props.view_store.toggleOpenDialog();
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

  onToggleInspector(){
    this.props.view_store.toggleInspector();
  }

  render() {
    const isSelected = this.props.view_store.selectedTorrents.length > 0;
    const multipleSelection = this.props.view_store.selectedTorrents.length > 1;
    const selectedTorrent = this.props.torrents_store.getByIds(this.props.view_store.selectedTorrents)[0];
    const isPaused = selectedTorrent && selectedTorrent.status === Torrent.STATUS_STOPPED;

    return (
      <div styleName='toolbar'>
        <button styleName='button' onClick={this.onOpen}>
          <img src={toolbarFolderImage} title='Open Torrent' alt='Open Torrent'/>
        </button>
        <button styleName='button' onClick={this.onRemove} disabled={!isSelected}>
          <img src={toolbarCloseImage} title='Remove Selected Torrents' alt='Remove Selected Torrents'/>
        </button>
        <span styleName='separator'></span>
        <button styleName='button' onClick={this.onStart} disabled={!isSelected && !isPaused && !multipleSelection}>
          <img src={toolbarStartImage} title='Start Selected Torrents' alt='Start Selected Torrents'/>
        </button>
        <button styleName='button' onClick={this.onPause} disabled={!isSelected && !isPaused && !multipleSelection}>
          <img src={toolbarPauseImage} title='Pause Selected Torrents' alt='Pause Selected Torrents'/>
        </button>
        <span styleName='separator'></span>
        <button styleName='button' onClick={this.onStartAll}>
          <img src={toolbarStartAllImage} title='Start All Torrents' alt='Start All Torrents'/>
        </button>
        <button styleName='button' onClick={this.onPauseAll}>
          <img src={toolbarPauseAllImage} title='Pause All Torrents' alt='Pause All Torrents'/>
        </button>

        <button styleName='button' onClick={this.onToggleInspector}>
          <img src={toolbarInfoImage} title='Toggle inspector' alt='Toggle inspector'/>
        </button>

        <OpenDialog />
      </div>
    );
  }
}

export default ActionToolbar;
