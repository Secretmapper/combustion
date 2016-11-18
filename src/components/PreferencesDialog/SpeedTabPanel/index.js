import React, { Component} from 'react';
import { inject, observer } from 'mobx-react';

@inject('view_store')
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
