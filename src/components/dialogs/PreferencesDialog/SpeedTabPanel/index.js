import React, { Component} from 'react';
import { inject, observer } from 'mobx-react';

import TextRow from '../fields/TextRow';
import CheckRow from '../fields/CheckRow';
import CheckValueRow from '../fields/CheckValueRow';
import SelectRow from '../fields/SelectRow';
import { times, days } from './schedule.fixture'

@inject('view_store', 'session_store')
@observer
class SpeedTabPanel extends Component {
  state = {
    schedule: this.props.session_store.settings['alt-speed-time-enabled']
  }

  render() {
    const scheduleEnabled = this.props.session_store.settings['alt-speed-time-enabled'];

    return (
      <div>
        <h3>Speed Limits</h3>
        <div>
          <CheckValueRow idCheck='speed-limit-up-enabled' idValue='speed-limit-up' label='Upload (kB/s)' half />
          <CheckValueRow idCheck='speed-limit-down-enabled' idValue='speed-limit-down' label='Download (kB/s)' half />
        </div>

        <h3>Alternative Speed Limits</h3>
        <p>Override normal speed limits manually or at scheduled times</p>

        <div>
          <TextRow id='alt-speed-up' label='Upload (kB/s)' half />
          <TextRow id='alt-speed-down' label='Download (kB/s)' half />
        </div>

        <CheckRow id='alt-speed-time-enabled' label='Scheduled Times' />

        <SelectRow id='alt-speed-time-begin' label='From' options={times} disabled={!scheduleEnabled} third />
        <SelectRow id='alt-speed-time-end' label='To' options={times} disabled={!scheduleEnabled} third />
        <SelectRow id='alt-speed-time-day' label='On days' options={days} disabled={!scheduleEnabled} third />
      </div>
    );
  }
}

export default SpeedTabPanel;
