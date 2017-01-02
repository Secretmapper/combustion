import React, { Component} from 'react';
import { inject, observer } from 'mobx-react';

import TextRow from '../fields/TextRow';
import PortTestRow from '../fields/PortTestRow';
import CheckRow from '../fields/CheckRow';

@inject('view_store', 'session_store')
@observer
class NetworkTabPanel extends Component {

  render() {
    return (
      <div>
        <h3>Listening port</h3>

        <TextRow id='peer-port' label='Peer listening port'/>
        <PortTestRow/>
        <CheckRow id='peer-port-random-on-start' label='Randomize port on launch'/>
        <CheckRow id='port-forwarding-enabled' label='Use port forwarding from my router'/>

        <h3>Options</h3>
        <CheckRow id='utp-enabled' label='uTP is a tool for reducing network congestion.'/>
      </div>
    );
  }
}

export default NetworkTabPanel;
