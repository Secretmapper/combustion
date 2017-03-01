import React, { Component} from 'react';
import { inject, observer } from 'mobx-react';

import TextRow from '../fields/TextRow';
import CheckRow from '../fields/CheckRow';
import CheckValueRow from '../fields/CheckValueRow';
import SelectRow from '../fields/SelectRow';
import { times, days } from './schedule.fixture'

@inject('view_store')
@observer
class SpeedTabPanel extends Component {
  render() {
    return (
      <div>
        <h3>Speed Limits</h3>
        <CheckValueRow idCheck='speed-limit-up-enabled' idValue='speed-limit-up' label='Upload (kB/s)'/>
        <CheckValueRow idCheck='speed-limit-down-enabled' idValue='speed-limit-down' label='Download (kB/s)'/>

        <h3>Alternative Speed Limits</h3>
        <p>Override normal speed limits manually or at scheduled times</p>

        <TextRow id='alt-speed-up' label='Upload (kB/s)'/>
        <TextRow id='alt-speed-down' label='Download (kB/s)'/>
        <CheckRow id='alt-speed-time-enabled' label='Scheduled Times'/>

        <SelectRow id='alt-speed-time-begin' label='From' options={times}/>
        <SelectRow id='alt-speed-time-end' label='To' options={times}/>
        <SelectRow id='alt-speed-time-day' label='On days' options={days}/>
      </div>
    );
  }
}

export default SpeedTabPanel;
