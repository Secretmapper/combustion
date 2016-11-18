import React, { Component} from 'react';
import CSSModules from 'react-css-modules';
import { inject, observer } from 'mobx-react';
import autobind from 'autobind-decorator';

@observer
class TorrentsTabPanel extends Component {
  render() {
    return (
      <div>
        <h2>Downloading</h2>
        <h2>Seeding</h2>
      </div>
    );
  }
}

export default TorrentsTabPanel;
