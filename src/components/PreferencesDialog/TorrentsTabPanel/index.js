import React, { Component} from 'react';
import { inject, observer } from 'mobx-react';

@inject('view_store')
@observer
class TorrentsTabPanel extends Component {
  render() {
    return (
      <div>
        <h3>Downloading</h3>
        <input type='text' data-field='download-dir'></input>
        <h3>Seeding</h3>
      </div>
    );
  }
}

export default TorrentsTabPanel;
