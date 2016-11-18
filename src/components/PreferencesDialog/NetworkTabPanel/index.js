import React, { Component} from 'react';
import { inject, observer } from 'mobx-react';

@inject('view_store')
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
