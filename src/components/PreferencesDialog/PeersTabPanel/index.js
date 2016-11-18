import React, { Component} from 'react';
import CSSModules from 'react-css-modules';
import { inject, observer } from 'mobx-react';
import autobind from 'autobind-decorator';

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
