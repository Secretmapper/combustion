import React, { Component} from 'react';
import CSSModules from 'react-css-modules';
import { inject, observer } from 'mobx-react';
import autobind from 'autobind-decorator';

import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';

import Dialog from '../Dialog'

import TorrentsTabPanel from './TorrentsTabPanel'
import SpeedTabPanel from './SpeedTabPanel'
import PeersTabPanel from './PeersTabPanel'
import NetworkTabPanel from './NetworkTabPanel'

import styles from './styles/index.css';

@inject('view_store')
@observer
@CSSModules(styles)
class PreferencesDialog extends Component {
  @autobind onBlur(event) {
    const field = event.target.attributes['data-field'].value;

    alert(`Data: ${field}`);
  }

  @autobind onHide() {
    this.props.view_store.togglePreferencesDialog();
  }

  @autobind handleSelect(index, last) {
    console.log('Selected tab: ' + index + ', Last tab: ' + last);
  }

  render() {
    return (
      <Dialog
        show={this.props.view_store.isPreferencesDialogShown}
        onHide={this.onHide}
      >
        <div styleName='body'>
          <Tabs onBlur={this.onBlur} onSelect={this.handleSelect}>
            <TabList>
              <Tab>Torrents</Tab>
              <Tab>Speed</Tab>
              <Tab>Peers</Tab>
              <Tab>Network</Tab>
            </TabList>
            <TabPanel>
              <TorrentsTabPanel/>
            </TabPanel>
            <TabPanel>
              <SpeedTabPanel/>
            </TabPanel>
            <TabPanel>
              <PeersTabPanel/>
            </TabPanel>
            <TabPanel>
              <NetworkTabPanel/>
            </TabPanel>
          </Tabs>
        </div>
      </Dialog>
    );
  }
}

export default PreferencesDialog;
