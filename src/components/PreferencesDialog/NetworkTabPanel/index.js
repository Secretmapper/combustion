import React, { Component} from 'react';
import CSSModules from 'react-css-modules';
import { inject, observer } from 'mobx-react';
import autobind from 'autobind-decorator';

@observer
class NetworkTabPanel extends Component {
  render() {
    return (
      <div>
        <h2>Listening port</h2>
        <h2>Options</h2>
      </div>
    );
  }
}

export default NetworkTabPanel;
