import React, { Component} from 'react';
import CSSModules from 'react-css-modules';
import { inject, observer } from 'mobx-react';
import autobind from 'autobind-decorator';

@observer
class SpeedTabPanel extends Component {
  render() {
    return (
      <div>
        <h2>Speed Limits</h2>
        <h2>Alternative Speed Limits</h2>
      </div>
    );
  }
}

export default SpeedTabPanel;
