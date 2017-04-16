import React, { Component} from 'react';
import CSSModules from 'react-css-modules';
import { inject, observer } from 'mobx-react';
import autobind from 'autobind-decorator';

import TorrentStats from 'stores/torrent-stats';

import { Tab, Tabs } from 'react-toolbox/lib/tabs';

import { IconButton, Button } from 'react-toolbox/lib/button'
import ChevronRight from 'react-icons/lib/md/chevron-right';
import Edit from 'react-icons/lib/md/edit';
import InfoIcon from 'react-icons/lib/md/info';
import PeersIcon from 'react-icons/lib/md/device-hub';
import TrackersIcon from 'react-icons/lib/md/track-changes';
import FilesIcon from 'react-icons/lib/md/insert-drive-file';

import Activity from './Activity';
import Details from './Details';
import Peers from './Peers';
import Trackers from './Trackers';
import Files from './Files';

import styles from './styles/index.css';

@inject('view_store', 'torrents_store')
@observer
@CSSModules(styles)
class Inspector extends Component {
  state = {
    index: 0
  }

  @autobind handleTabChange(index) {
    this.setState({index})
  }

  @autobind onToggleInspector() {
    this.props.view_store.toggleInspector();
  }

  @autobind rename() {
    this.props.view_store.toggleRenamePrompt();
  }

  @autobind setLocation() {
    this.props.view_store.toggleLocationPrompt();
  }

  render() {
    const selectedTorrentIds = this.props.view_store.selectedTorrents;
    const torrents = this.props.torrents_store.getByIds(selectedTorrentIds);

    const info = new TorrentStats(torrents);
    const singleTorrent = torrents.length === 1;

    return (
      <div styleName='inspector'>
        <div styleName='inspectorCloseButton'>
          <Button icon={<ChevronRight style={{ verticalAlign: 'baseline' }} />} label='Close Inspector' onMouseUp={this.onToggleInspector} raised primary />
        </div>
        <Tabs index={this.state.index} onChange={this.handleTabChange} fixed>
          <Tab label='Info' icon={<InfoIcon />}>
            <div>
              <h1>{info.title} {singleTorrent && <IconButton onClick={this.rename} icon={<Edit style={{ verticalAlign: 'baseline' }} />} />}</h1>
              <Activity info={info} />
              <Details
                info={info}
                setLocation={this.setLocation}
                canSetLocation={singleTorrent}
              />
            </div>
          </Tab>
          <Tab label='Peers' icon={<PeersIcon />}>
            <div>
              <h1>{info.title}</h1>
              {info.peers.length > 0 && <Peers info={info} />}
            </div>
          </Tab>
          <Tab label='Trackers' icon={<TrackersIcon />}>
            <div>
              <h1>{info.title}</h1>
              {info.trackers.length > 0 && <Trackers info={info} />}
            </div>
          </Tab>
          <Tab label='Files' icon={<FilesIcon />}>
            <div>
              <h1>{info.title}</h1>
              {info.files.length > 0 && <Files info={info} />}
            </div>
          </Tab>
        </Tabs>
      </div>
    );
  }
}

export default Inspector;
