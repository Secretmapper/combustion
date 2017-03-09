import React, { Component} from 'react';
import { inject, observer } from 'mobx-react';

import CheckValueRow from '../fields/CheckValueRow';

@inject('view_store', 'session_store')
@observer
class NetworkTabPanel extends Component {

  render() {
    return (
      <div>
        <CheckValueRow
          idCheck='download-queue-enabled'
          idValue='download-queue-size'
          label='Download Queue Size'
        />
        <CheckValueRow
          idCheck='queue-stalled-enabled'
          idValue='queue-stalled-minutes'
          label='Consider active torrents as stalled when idle for __ minutes:'
        />
      </div>
    );
  }
}

export default NetworkTabPanel;
