import React, { Component} from 'react';
import { inject, observer } from 'mobx-react';
import { range } from 'lodash';

import TextRow from '../fields/TextRow';
import CheckRow from '../fields/CheckRow';
import CheckValueRow from '../fields/CheckValueRow';
import SelectRow from '../fields/SelectRow';

@inject('view_store')
@observer
class SpeedTabPanel extends Component {
  render() {
    const times = range(0, 1440, 15).reduce( (memo, item) => {
      const hours = Math.round(item/60);
      const minutes = item % 60;

      memo[item] = `${hours}:${minutes}`;
      return memo;
    }, {});
    const days = {
      '127': 'Everyday',
      '62': 'Weekdays',
      '65': 'Weekends',
      '1': 'Sunday',
      '2': 'Monday',
      '4': 'Tuesday',
      '8': 'Wednesday',
      '16': 'Thursday',
      '32': 'Friday',
      '64': 'Saturday',
    }

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
