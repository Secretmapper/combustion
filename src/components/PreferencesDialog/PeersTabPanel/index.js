import React, { Component} from 'react';
import { inject, observer } from 'mobx-react';

@inject('view_store')
@observer
class PeersTabPanel extends Component {
  render() {
    return (
      <div>
        <h2>Connections</h2>
        <h2>Options</h2>
        <h2>Blocklist</h2>
      </div>
    );
  }
}

export default PeersTabPanel;
