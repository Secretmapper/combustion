import React, { Component} from 'react';
import { inject, observer } from 'mobx-react';

@inject('view_store')
@observer
class NetworkTabPanel extends Component {
  render() {
    return (
      <div>
        <h3>Listening port</h3>
        <h3>Options</h3>
        <div id="prefs-page-network">
          <div class="prefs-section">
            <div class="title">Listening Port</div>
            <div class="row"><div class="key"><label for="peer-port">Peer listening port:</label></div>
                             <div class="value"><input type="number" min="0" max="65535" id="peer-port"/></div></div>
            <div class="row"><div class="key">&nbsp;</div>
                             <div class="value"><span id="port-label">Status: Unknown</span></div></div>
            <div class="checkbox-row"><input type="checkbox" id="peer-port-random-on-start"/><label for="peer-port-random-on-start">Randomize port on launch</label></div>
            <div class="checkbox-row"><input type="checkbox" id="port-forwarding-enabled"/><label for="port-forwarding-enabled">Use port forwarding from my router</label></div>
          </div>
          <div class="prefs-section">
            <div class="title">Options</div>
            <div class="checkbox-row"><input type="checkbox" id="utp-enabled" title="uTP is a tool for reducing network congestion."/>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default NetworkTabPanel;
