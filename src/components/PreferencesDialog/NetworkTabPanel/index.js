import React, { Component} from 'react';
import { inject, observer } from 'mobx-react';

@inject('view_store')
@observer
class NetworkTabPanel extends Component {
  render() {
    return (
      <div>
        <h3>Listening port</h3>
        <h3>Options</h3>
      </div>
    );
  }
}

export default NetworkTabPanel;
