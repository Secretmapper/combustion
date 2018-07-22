import React, { Component} from 'react';
import CSSModules from 'react-css-modules';
import { inject, observer } from 'mobx-react';
import autobind from 'autobind-decorator';

import styles from '../styles/index.css';

import TextRow from '../fields/TextRow';
import CheckRow from '../fields/CheckRow';
import CheckValueRow from '../fields/CheckValueRow';
import Input from 'react-toolbox/lib/input';

@inject('view_store', 'prefs_store')
@observer
@CSSModules(styles)
class TorrentsTabPanel extends Component {
  @autobind setRPCEndpoint(value) {
    this.props.prefs_store.setRPCEndpoint(value);
  }

  render() {
    return (
      <div>
        <TextRow id='download-dir' label='Download to'/>
        <CheckRow id='start-added-torrents' label='Start when added'/>
        <CheckValueRow
          idCheck='incomplete-dir-enabled'
          idValue='incomplete-dir'
          label='Directory for Incomplete Files'
          type='text'
        />
        <CheckRow id='rename-partial-files' label='Append ".part" to incomplete files'/>

        <h3>Seeding</h3>
        <CheckValueRow idCheck='seedRatioLimited' idValue='seedRatioLimit' label='Stop seeding at ratio'/>
        <CheckValueRow idCheck='idle-seeding-limit-enabled' idValue='idle-seeding-limit' label='Stop seeding if idle for (min)'/>
        <Input
          label='RPC endpoint'
          value={this.props.prefs_store.rpcEndpoint}
          onChange={this.setRPCEndpoint}
        />
      </div>
    );
  }
}

export default TorrentsTabPanel;
