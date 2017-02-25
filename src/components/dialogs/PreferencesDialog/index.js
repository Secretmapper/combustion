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

@inject('view_store', 'session_store')
@observer
@CSSModules(styles)
class PreferencesDialog extends Component {
  @autobind onBlur(event) {
    const type = event.target.type;
    const id = event.target.attributes.id.value;
    const value = event.target.value;

    if (type !== 'checkbox' && type !== 'radio') {
      this.props.session_store.setPreference(id, parseAsNumberIfNumber(value));
    }
  }

  @autobind onChange(event) {
    const type = event.target.type;
    const id = event.target.attributes.id.value;
    const value = event.target.checked;

    if (type === 'checkbox') {
      this.props.session_store.setPreference(id, value);
    }
  }

  @autobind onHide() {
    this.props.view_store.togglePreferencesDialog();
  }

  render() {
    return (
      <Dialog
        show={this.props.view_store.isPreferencesDialogShown}
        onHide={this.onHide}
        header='Preferences'
      >
        <div styleName='body'>
          <div styleName='content'>
            <Tabs onBlur={this.onBlur} onChange={this.onChange}>
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
        </div>
      </Dialog>
    );
  }
}

function parseAsNumberIfNumber (str) {
    if (parseInt(str, 10).toString() === str) {
      return parseInt(str, 10);
    }
    if (parseFloat(str).toString() === str) {
      return parseFloat(str);
    }
}

export default PreferencesDialog;
