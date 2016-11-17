import React, { Component} from 'react';
import CSSModules from 'react-css-modules';
import { inject, observer } from 'mobx-react';
import autobind from 'autobind-decorator';

import toolbarFolderImage from 'images/toolbar-folder.png';
import toolbarCloseImage from 'images/toolbar-close.png';
import toolbarPauseImage from 'images/toolbar-pause.png';
import toolbarStartImage from 'images/toolbar-start.png';
import toolbarPauseAllImage from 'images/toolbar-pause-all.png';
import toolbarStartAllImage from 'images/toolbar-start-all.png';
import toolbarInfoImage from 'images/toolbar-info.png';

import OpenDialog from 'components/OpenDialog';

import styles from './styles/index.css';

@inject('torrents_store', 'view_store')
@observer
@CSSModules(styles)
class ActionToolbar extends Component {
  @autobind onOpen() {
    this.props.view_store.toggleOpenDialog();
  }

  @autobind onRemove(){
    alert('remove');
  }

  @autobind onPause(){
    this.props.torrents_store.stop(this.props.view_store.selectedTorrents);
  }

  @autobind onStart() {
    this.props.torrents_store.start(this.props.view_store.selectedTorrents);
  }

  @autobind onPauseAll(){
    this.props.torrents_store.stop(this.props.torrents_store.torrents.map((torrent) => torrent.id));
  }

  @autobind onStartAll(){
    this.props.torrents_store.start(this.props.torrents_store.torrents.map((torrent) => torrent.id));
  }

  @autobind onToggleInspector(){
    this.props.view_store.toggleInspector();
  }

  render() {
    const { view_store, torrents_store } = this.props;

    const selectedTorrents = torrents_store.getByIds(view_store.selectedTorrents);
    const isAnySelected = selectedTorrents.length > 0;
    const isAnyStarted = selectedTorrents.some((torrent) => torrent.isDownloading || torrent.isSeeding);
    const isAnyPaused = selectedTorrents.some((torrent) => torrent.isStopped);

    return (
      <div styleName='toolbar'>
        <button styleName='button' onClick={this.onOpen}>
          <img src={toolbarFolderImage} title='Open Torrent' alt='Open Torrent'/>
        </button>
        <button styleName='button' onClick={this.onRemove} disabled={!isAnySelected}>
          <img src={toolbarCloseImage} title='Remove Selected Torrents' alt='Remove Selected Torrents'/>
        </button>
        <span styleName='separator'></span>
        <button styleName='button' onClick={this.onStart} disabled={!isAnyPaused}>
          <img src={toolbarStartImage} title='Start Selected Torrents' alt='Start Selected Torrents'/>
        </button>
        <button styleName='button' onClick={this.onPause} disabled={!isAnyStarted}>
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
