import React, { Component} from 'react';
import CSSModules from 'react-css-modules';
import { inject, observer } from 'mobx-react';

import styles from '../styles/index.css';

import TextRow from '../fields/TextRow';
import CheckRow from '../fields/CheckRow';
import CheckValueRow from '../fields/CheckValueRow';

@inject('view_store')
@observer
@CSSModules(styles)
class TorrentsTabPanel extends Component {
  render() {
    return (
      <div>
        <h3>Downloading</h3>
        <TextRow id='download-dir' label='Download to'/>
        <CheckRow id='start-added-torrents' label='Start when added'/>
        <CheckRow id='rename-partial-files' label='Append ".part" to incomplete files'/>

        <h3>Seeding</h3>
        <CheckValueRow idCheck='seedRatioLimited' idValue='seedRatioLimit' label='Stop seeding at ratio'/>
        <CheckValueRow idCheck='idle-seeding-limit-enabled' idValue='idle-seeding-limit' label='Stop seeding if idle for (min)'/>
      </div>
    );
  }
}

export default TorrentsTabPanel;
