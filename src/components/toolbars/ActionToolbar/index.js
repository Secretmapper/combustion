import React, { Component} from 'react';
import CSSModules from 'react-css-modules';
import { inject, observer } from 'mobx-react';
import autobind from 'autobind-decorator';

import { IconButton } from 'react-toolbox/lib/button';
import AddIcon from 'react-icons/lib/md/add-circle';
import DeleteIcon from 'react-icons/lib/md/delete-forever';

import PlayIcon from 'react-icons/lib/md/play-circle-outline';
import PauseIcon from 'react-icons/lib/md/pause-circle-outline';

import PlayAllIcon from 'react-icons/lib/md/play-circle-filled';
import PauseAllIcon from 'react-icons/lib/md/pause-circle-filled';

import InfoIcon from 'react-icons/lib/md/info';

import styles from './styles/index.css';

@inject('torrents_store', 'view_store')
@observer
@CSSModules(styles)
class ActionToolbar extends Component {
  @autobind onOpen() {
    this.props.view_store.toggleOpenDialog();
  }

  @autobind onRemove() {
    const confirmRemove = confirm(`Once removed, continuing the transfer will require the torrent file. Are you sure you want to remove it?`);

    if (!confirmRemove) return;

    this.props.torrents_store.remove(this.props.view_store.selectedTorrents);
  }

  @autobind onPause() {
    this.props.torrents_store.stop(this.props.view_store.selectedTorrents);
  }

  @autobind onStart() {
    this.props.torrents_store.start(this.props.view_store.selectedTorrents);
  }

  @autobind onPauseAll() {
    this.props.torrents_store.stop(this.props.torrents_store.torrents.map((torrent) => torrent.id));
  }

  @autobind onStartAll() {
    this.props.torrents_store.start(this.props.torrents_store.torrents.map((torrent) => torrent.id));
  }

  @autobind onToggleInspector() {
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
        <IconButton styleName='button' title='Open Torrent' onClick={this.onOpen} >
          <AddIcon/>
        </IconButton>
        <IconButton styleName='button' disabled={!isAnySelected} title='Remove Selected Torrents' onClick={this.onRemove}>
          <DeleteIcon/>
        </IconButton>
        <IconButton styleName='button' disabled={!isAnyPaused} title='Start Selected Torrents' onClick={this.onStart} >
          <PlayIcon />
        </IconButton>
        <IconButton styleName='button' disabled={!isAnyStarted} title='Pause Selected Torrents' onClick={this.onPause} >
          <PauseIcon />
        </IconButton>
        <IconButton styleName='button' title='Start All Torrents' onClick={this.onStartAll} >
          <PlayAllIcon />
        </IconButton>
        <IconButton styleName='button' title='Pause All Torrents' onClick={this.onPauseAll} >
          <PauseAllIcon />
        </IconButton>
        <IconButton styleName='button' title='Toggle inspector' onClick={this.onToggleInspector} >
          <InfoIcon />
        </IconButton>
      </div>
    );
  }
}

export default ActionToolbar;
