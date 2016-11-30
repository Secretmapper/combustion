import React, { Component} from 'react';
import { inject, observer } from 'mobx-react';

@inject('view_store')
@observer
class PeersTabPanel extends Component {
  render() {
    return (
      <div>
        <h3>Connections</h3>
        <h3>Options</h3>
        <h3>Blocklist</h3>
        <div class="prefs-section">
          <div class="title">Connections</div>
          <div class="row"><div class="key"><label for="peer-limit-per-torrent">Max peers per torrent:</label></div>
                           <div class="value"><input type="number" min="0" id="peer-limit-per-torrent"/></div></div>
          <div class="row"><div class="key"><label for="peer-limit-global">Max peers overall:</label></div>
                           <div class="value"><input type="number" min="0" id="peer-limit-global"/></div></div>
        </div>
        <div class="prefs-section">
          <div class="title">Options</div>
          <div class="row"><div class="key">Encryption mode:</div>
                           <div class="value"><select id="encryption">
                             <option value="tolerated">Allow encryption</option>
                             <option value="preferred">Prefer encryption</option>
                             <option value="required">Require encryption</option></select></div></div>
          <div class="checkbox-row"><input type="checkbox" id="pex-enabled" title="PEX is a tool for exchanging peer lists with the peers you're connected to."/>
                                    <label for="pex-enabled" title="PEX is a tool for exchanging peer lists with the peers you're connected to.">Use PEX to find more peers</label></div>
          <div class="checkbox-row"><input type="checkbox" id="dht-enabled" title="DHT is a tool for finding peers without a tracker."/>
                                    <label for="dht-enabled" title="DHT is a tool for finding peers without a tracker.">Use DHT to find more peers</label></div>
          <div class="checkbox-row"><input type="checkbox" id="lpd-enabled" title="LPD is a tool for finding peers on your local network."/>
                                    <label for="lpd-enabled" title="LPD is a tool for finding peers on your local network.">Use LPD to find more peers</label></div>
        </div>
        <div class="prefs-section">
          <div class="title">Blocklist</div>
          <div class="row"><div class="key"><input type="checkbox" id="blocklist-enabled"/><label for="blocklist-enabled">Enable blocklist:</label></div>
                           <div class="value"><input type="url" id="blocklist-url"/></div></div>
          <div class="row"><div class="key" id="blocklist-info">Blocklist has <span id="blocklist-size">?</span> rules</div>
                           <div class="value"><input type="button" id="blocklist-update-button" value="Update"/></div></div>
        </div>
      </div>
    );
  }
}

export default PeersTabPanel;
