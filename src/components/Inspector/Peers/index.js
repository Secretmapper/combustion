import React, { Component } from 'react';
import CSSModules from 'react-css-modules';
import { inject, observer } from 'mobx-react';
import autobind from 'autobind-decorator';

import { Button } from 'react-toolbox/lib/button'

import PeerGroup from './PeerGroup';

import styles from './styles/index.css';

@inject('view_store', 'torrents_store')
@observer
@CSSModules(styles)
class Peers extends Component {
  @autobind askTrackerMorePeers() {
    this.props.torrents_store.askTrackerMorePeers(this.props.view_store.selectedTorrents);
  }

  render () {
    const { info } = this.props

    return (
      <div>
        <Button
          styleName='morePeersBtn'
          label='Ask tracker for more peers'
          onMouseUp={this.askTrackerMorePeers}
          raised
          primary
        />
        {info.peers.map(({ name, peers }, index) => (
          <div key={index}>
            {info.peers.length > 1 && <p>{name}</p>}
            <PeerGroup peers={peers} />
          </div>
        ))}
      </div>
    );
  }
}

export default Peers;
