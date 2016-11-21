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
      </div>
    );
  }
}

export default PeersTabPanel;
