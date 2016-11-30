import React, { Component} from 'react';
import { inject, observer } from 'mobx-react';

@inject('view_store')
@observer
class TorrentsTabPanel extends Component {
  render() {
    return (
      <div>
        <h3>Downloading</h3>
        <h3>Seeding</h3>
        <div class="prefs-section">
          <div class="title">Downloading</div>
          <div class="row"><div class="key">Download to:</div><div class="value"><input type="text" id="download-dir"/></div></div>
          <div class="checkbox-row"><input type="checkbox" id="start-added-torrents"/><label for="start-added-torrents">Start when added</label></div>
          <div class="checkbox-row"><input type="checkbox" id="rename-partial-files"/><label for="rename-partial-files">Append &quot;.part&quot; to incomplete files' names</label></div>
        </div>
        <div class="prefs-section">
          <div class="title">Seeding</div>
          <div class="row"><div class="key"><input type="checkbox" id="seedRatioLimited"/><label for="seedRatioLimited">Stop seeding at ratio:</label></div>
                                                               <div class="value"><input type="number" min="0" id="seedRatioLimit"/></div></div>
          <div class="row"><div class="key"><input type="checkbox" id="idle-seeding-limit-enabled"/><label for="idle-seeding-limit-enabled">Stop seeding if idle for (min):</label></div>
                                                               <div class="value"><input type="number" min="0" id="idle-seeding-limit"/></div></div>
        </div>
      </div>
    );
  }
}

export default TorrentsTabPanel;
