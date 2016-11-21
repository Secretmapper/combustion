import React, { Component} from 'react';
import { inject, observer } from 'mobx-react';

@inject('view_store')
@observer
class SpeedTabPanel extends Component {
  render() {
    return (
      <div>
        <h3>Speed Limits</h3>
        <h3>Alternative Speed Limits</h3>
      </div>
    );
  }
}

export default SpeedTabPanel;
