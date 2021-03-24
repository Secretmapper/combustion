import React, { Component} from 'react';
import CSSModules from 'react-css-modules';
import { inject, observer } from 'mobx-react';
import autobind from 'autobind-decorator';

import { Button } from 'react-toolbox/lib/button'

import styles from '../styles/index.css';

import TextRow from '../fields/TextRow';
import CheckRow from '../fields/CheckRow';
import CheckValueRow from '../fields/CheckValueRow';
import SelectRow from '../fields/SelectRow';

@inject('view_store', 'session_store')
@observer
@CSSModules(styles)
class PeersTabPanel extends Component {
  constructor(props) {
    super(props);
    this.state = {
      blocklistSize: (this.props.session_store.blocklistSize == -1) ? '?' : this.props.session_store.blocklistSize,
    };
  }

  @autobind updateBlocklist() {
    this.props.session_store.updateBlocklist().then((size) => {
      this.setState({ blocklistSize: size });
    });
  }

  render() {
    const encryption = {
      tolerated: 'Allow encryption',
      preferred: 'Prefer encryption',
      required: 'Require encryption',
    };

    return (
      <div>
        <h3>Connections</h3>
        <div>
          <TextRow id='peer-limit-per-torrent' label='Max peers per torrent' half />
          <TextRow id='peer-limit-global' label='Max peers overall' half />
        </div>

        <h3>Options</h3>

        <SelectRow id='encryption' label='Encryption mode' options={encryption}/>
        <CheckRow id='pex-enabled' label='Use PEX to find more peers' title="PEX is a tool for exchanging peer lists with the peers you're connected to."/>
        <CheckRow id='dht-enabled' label='Use DHT to find more peers' title="DHT is a tool for finding peers without a tracker."/>
        <CheckRow id='lpd-enabled' label='Use LPD to find more peers' title="LPD is a tool for finding peers on your local network."/>

        <h3>Blocklist</h3>
        <CheckValueRow idCheck='blocklist-enabled' idValue='blocklist-url' label='Enable blocklist' type='url'/>

        <div className="row">
          <div className="key" id="blocklist-info">Blocklist has <span id="blocklist-size">{this.state.blocklistSize}</span> rules</div>
          <Button label='Update blocklist' onMouseUp={this.updateBlocklist} raised primary />
        </div>
      </div>
    );
  }
}

export default PeersTabPanel;
