import React, { Component} from 'react';
import { inject, observer } from 'mobx-react';

import styles from '../styles/index.css';

import TextRow from '../fields/TextRow';
import CheckRow from '../fields/CheckRow';
import CheckValueRow from '../fields/CheckValueRow';

@inject('view_store')
@observer
class NetworkTabPanel extends Component {
  render() {
    return (
      <div>
        <h3>Listening port</h3>

        <div className="row">
          <div className="key"><label htmlFor="peer-port">Peer listening port:</label></div>
          <div className="value"><input type="number" min="0" max="65535" id="peer-port"/></div>
        </div>
        <div className="row">
          <div className="key">&nbsp;</div>
          <div className="value"><span id="port-label">Status: Unknown</span></div>
        </div>

        <CheckRow id='peer-port-random-on-start' label='Randomize port on launch'/>
        <CheckRow id='port-forwarding-enabled' label='Use port forwarding from my router'/>

        <h3>Options</h3>
        <CheckRow id='utp-enabled' label='uTP is a tool for reducing network congestion.'/>
      </div>
    );
  }
}

export default NetworkTabPanel;
