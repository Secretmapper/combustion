import React, { Component} from 'react';
import CSSModules from 'react-css-modules';
import { inject, observer } from 'mobx-react';

import styles from '../styles/index.css';

import TextRow from '../fields/TextRow';
import CheckRow from '../fields/CheckRow';
import CheckValueRow from '../fields/CheckValueRow';
import SelectRow from '../fields/SelectRow';

@inject('view_store')
@observer
@CSSModules(styles)
class PeersTabPanel extends Component {
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
        <CheckValueRow idCheck='blocklist-enabled' idValue='blocklist-url' label='Enable blocklist'/>

        <div className="row">
          <div className="key" id="blocklist-info">Blocklist has <span id="blocklist-size">?</span> rules</div>
          <div className="value"><input type="button" id="blocklist-update-button" value="Update"/></div>
        </div>
      </div>
    );
  }
}

export default PeersTabPanel;
