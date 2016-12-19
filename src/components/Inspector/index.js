import React, { Component} from 'react';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import CSSModules from 'react-css-modules';
import { inject, observer } from 'mobx-react';

import TorrentStats from 'stores/torrent-stats';

import infoImage from 'images/inspector-info.png';
import peersImage from 'images/inspector-peers.png';
import trackersImage from 'images/inspector-trackers.png';
import filesImage from 'images/inspector-files.png';

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
  onClickPriority(fileId, priority) {
    const selectedTorrentIds = this.props.view_store.selectedTorrents;

    this.props.torrents_store.setPriority(selectedTorrentIds[0], priority, [fileId]);
  }

  render() {
    const selectedTorrentIds = this.props.view_store.selectedTorrents;
    const torrents = this.props.torrents_store.getByIds(selectedTorrentIds);

    const info = new TorrentStats(torrents);

    return (
      <div styleName='inspector'>
        <Tabs>
          <TabList>
            <Tab><img src={infoImage} alt='Info' /></Tab>
            <Tab><img src={peersImage} alt='Peers' /></Tab>
            <Tab><img src={trackersImage} alt='Trackers' /></Tab>
            <Tab><img src={filesImage} alt='Files' /></Tab>
          </TabList>
          <TabPanel>
            <h1>{info.title}</h1>
            <Activity info={info} />
            <Details info={info} />
          </TabPanel>
          <TabPanel>
            <h1>{info.title}</h1>
            <Peers info={info} />
          </TabPanel>
          <TabPanel>
            <h1>{info.title}</h1>
            <Trackers info={info} />
          </TabPanel>
          <TabPanel>
            <h1>{info.title}</h1>
            <Files info={info} />
          </TabPanel>
        </Tabs>
      </div>
    );
  }
}

export default Inspector;
